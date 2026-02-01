export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken()

    // Cross-origin (e.g. dashboard.sivram.in → Render): cookie must be SameSite=None; Secure
    const crossOrigin = process.env.NODE_ENV === "production" || process.env.CROSS_ORIGIN_COOKIE === "true";
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: crossOrigin ? "none" : "lax",
        secure: crossOrigin,
    };
    if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;
    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        message,
        token,
        user
    })
}