import User from '../database/models/user.model.js';
import Profile from '../database/models/profile.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
    async getId(username) {
        console.log(`USERNAME: ${username}`);

        const user = await User.findOne({ where: {username} });
        console.log(`USER BY USERNAME: ${user}`);

        const userId = user.id;
        console.log(`USER ID: ${userId}`);

        return userId;
    };

    async createUser({username, password, profile }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, password: hashedPassword });

            const userId = newUser.id;

            const { displayName, avatarUrl, theme, language } = profile;
            await Profile.create({
                userId,
                displayName,
                avatarUrl,
                theme,
                language,
            });
            return {status: 200, message: "User succesfully created.", content: newUser, error: false};
        } catch (error) {
            if (error.errors) {
                const errorList = error.errors;
                let errorTypeList = [];

                for (const errorIndex in errorList) {
                    const errorType = errorList[errorIndex].type;
                    errorTypeList.push(errorType);
                }

                return {status: 400, message: "Bad request.", content: errorTypeList, error: true};
            }
            return {status: 500, message: "Internal server error.", content: error, error: true};
        }
    }

    async verifyCredentials({username, password}) {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return { status: 404, message: "User not found.", content: null, error: true };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { status: 401, message: "Invalid credentials.", content: null, error: true };
        }

        return {
            status: 200,
            message: "Valid credentials.",
            content: null
        };
    }

    generateToken({payload, secret}) {
        try {
            const token = jwt.sign(payload, secret);

            return {status: 200, message: "Token succesfully generated.", content: token, error: false};
        } catch (error) {
            return {status: 400, message: "Bad request.", content: error, error: true};
        }
    };

    verifyToken({token, secret}) {
        try {
            const decoded = jwt.verify(token, secret);
            return {status: 200, message: "Token is valid.", content: decoded, error: false};
        } catch (error) {
            return {status: 400, message: "Token is invalid.", content: null, error: false};
        }
    };
}
