const { checkPassword, getTokenPayload, checkToken, createToken, encryptPassword } = require("/core/tools/security")
const { assert, throwUnauthorized } = require("/core/api-utils")
const { select } = require("/vendor/bo/server/model/select")
const { update } = require("/vendor/bo/server/model/update")
const { renderCreateAccount } = require("../view/create-account")
const { renderResetPassword } = require("../view/reset-password")

const checkCredentials = async ({ req }, context, db) => {
    const now = new Date()
    const [ email, password ] = assert.notEmpty(req.body, "email", "password")

    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "email": email })))[0]
    if (!user) return throwUnauthorized()

    const data = {}
    const authorized = await checkPassword(password, user.password)
    if (!authorized) {
        data.last_updated = now
        data.login_failed++
    }
    else {
        data.last_login = now
        data.login_failed = 0
    }

    await db(update(context, "user", [id], data))

    if (!authorized) {
        return throwUnauthorized()
    }

    if (user.status === "pending") {
        return throwUnauthorized("account not activated", "NOT_ACTIVATED")
    }

    return { 
        status: "ok",
        user: {
            ...user,
            credentials: undefined
        }
    }
}

const checkActivationToken = async ({ req }, context, db) => {
    let token = assert.notEmpty(req.body, "token")
    token = Buffer.from(token, "base64").toString()

    const { email } = getTokenPayload(token)
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "email": email })))[0]
    if (!user) return throwUnauthorized()

    const timestamp = user.lastUpdated.getTime()
    const hashKey = `${user.password}-${timestamp}`
    const { status } = await checkToken(token, hashKey)
    
    if (status !== "ok") {
        return throwUnauthorized("invalid token", status === "expired" ? "TOKEN_EXPIRED" : "INVALID_TOKEN")
    }
    else {
        const data = {
            last_updated: new Date(),
            status: "active"
        }
        await db(update(context, "user", [id], data))
    }

    return { status: "ok" }
}

const saveRefreshToken = async ({ req }, context, db) => {
    const [ user_id, refreshToken ] = assert.notEmpty(req.body, "user_id", "refreshToken")
    const payload = getTokenPayload(refreshToken)
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "user_id": user_id })))[0]
    if (user_id !== payload.user_id || !user) {
        return throwUnauthorized("illegal refresh token save attempt")
    }
    await db(update(context, "user", [user_id], { refresh_token: refreshToken }))
    return { status: "ok" }
}

const checkRefreshToken = async ({ req }, context, db) => {
    const [ user_id, refreshToken ] = assert.notEmpty(req.body, "user_id", "refreshToken")
    const payload = getTokenPayload(refreshToken)
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "user_id": user_id })))[0]
    if (user_id !== payload.user_id || !user || user.refresh_token !== refreshToken) {
        return throwUnauthorized("invalid refresh token")
    }

    return { status: "ok" }
}

const requestPasswordReset = async ({ req, config }, context, db, mailClient) => {
    let [origin, email] = assert.notEmpty(req.body, "origin", "email")
    email = email.toLowerCase()
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "email": email })))[0]

    if (user && user.status === "active") {
        const hashKey = `${user.password}-${user.last_updated.getTime()}`
        const token = createToken({ email }, hashKey, config.resetPasswordTokenExpirationTime)
        const data = {
            resetPasswordLink: `${origin}${config.resetPasswordLink}/${Buffer(token).toString("base64")}`,
            registrationLink: context.config.user.instanceFQDN
        }
        const content = renderResetPassword(context, data)
        await mailClient.sendMail({
            type: "html",
            from: context.config["reset-password"].replyAddress,
            to: email,
            subject: context.localize("Réinitialisation mot de passe Flow-ER"),
            content: content
        })
    }
    else {
        return throwUnauthorized("account not activated", "NOT_ACTIVATED")
    }

    return {status: "ok"}
}

const resetPassword = async ({ req }, context, db) => {
    const now = new Date()
    let [token, email, password] = assert.notEmpty(req.body, "token", "email", "password")
    token = Buffer.from(token, "base64").toString()
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "email": email })))[0]
    const hashKey = `${user.password}-${user.last_updated.getTime()}`
    const { status, payload } = await checkToken(token, hashKey)

    if (status === "expired") {
        return throwUnauthorized("token expired")
    }
    else if (status === "invalid") {
        return throwUnauthorized("invalid token")
    }
    else if (email !== payload.email) {
        return throwUnauthorized("invalid email")
    }

    const data = {
        password: await encryptPassword(password),
        last_updated: now,
        login_failed: 0,
    }
    await db(update(context, "user", [user.user_id], data))
    
    return {status: "ok"}
}

const sendActivationLink = async ({ req, config }, context, db, mailClient) => {
    let [origin, email] = assert.notEmpty(req.body, "origin", "email")
    email = email.toLowerCase()
    const user = (await db(select("user", ["user_id", "password", "last_login", "last_updated", "login_failed"], { "email": email })))[0]

    if (user && user.status === "pending") {
        const hashKey = `${user.password}-${user.last_updated.getTime()}`
        const token = createToken({ email }, hashKey, config.accountActivationTokenExpirationTime)
        await mailClient.sendMail({
            type: "html",
            from: context.config["create-account"].replyAddress,
            to: email,
            subject: context.localize("Bienvenue chez Flow-ER"),
            content: content
        })

        const content = renderCreateAccount(context, data)
        await mailClient.sendMail({
            templateName: "create-account",
            templateValues: {
                activationLink: `${origin}${config.accountActivationLink}/${Buffer(token).toString("base64")}`
            },
            to: email
        })
    }
    else {
        return throwUnauthorized("account already activated", "ALREADY_ACTIVATED")
    }

    return {status: "ok"}
}

module.exports = {
    checkCredentials,
    checkActivationToken,
    saveRefreshToken,
    checkRefreshToken,
    requestPasswordReset,
    resetPassword,
    sendActivationLink
}