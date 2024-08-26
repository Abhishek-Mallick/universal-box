export const test = (req, res) => {
    res.json({ message: 'API is working!'});
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('USer has been signed out!!');

    } catch (error) {
        next(error);
    }
};