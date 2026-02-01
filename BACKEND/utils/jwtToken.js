export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken()

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    };
    // When backend is at api.sivram.in, set in .env: COOKIE_DOMAIN=.sivram.in
    if (process.env.COOKIE_DOMAIN) cookieOptions.domain = process.env.COOKIE_DOMAIN;
    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        message,
        token,
        user
    })
}