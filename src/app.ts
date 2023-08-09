import express, { Application, Request, Response } from 'express'

import modules from './modules';
import path from 'path';
import { BadRequestException, NotFoundException } from './utils/service-exception';
import bodyParser from 'body-parser';
import Course from './models/course.model';
import User from './models/user.model';
import cookieParser from 'cookie-parser';
import { Console } from 'console';
const app: Application = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(modules);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
const requireLogin = (req, res, next) => {
    const authCookie = req.cookies.auth;
    if (authCookie) {
        // User is logged in
        next();
    } else {
        // User is not logged in, redirect to login page or show an error message
        res.redirect('/login'); // Redirect to the login page

    }
};
app.get('/', (req: Request, res: Response) => {

    res.render('index.ejs');
});

app.post('/add-result', requireLogin, (req: Request, res: Response) => {
    const authCookie = req.cookies.auth;
    const {
        title,
        code,
        unit,
        grade,
        session,
        semester,
        level,
        gradePoint,
        weightedAverage,
        matNumber
    } = req.body;
    try {
        const courseData = {
            title,
            code,
            unit,
            grade,
            session,
            semester,
            level,
            gradePoint,
            weightedAverage,
            matNumber
        };
        if (courseData.grade === "A") {
            courseData.gradePoint = 5;
        } else if (courseData.grade === "B") {
            courseData.gradePoint = 4;
        } else if (courseData.grade === "C") {
            courseData.gradePoint = 3;
        } else if (courseData.grade === "D") {
            courseData.gradePoint = 2;
        } else if (courseData.grade === "E") {
            courseData.gradePoint = 1;
        } else if (courseData.grade === "F") {
            courseData.gradePoint = 0;
        }
        courseData.weightedAverage = courseData.gradePoint * courseData.unit;

        const auth = JSON.parse(authCookie)
        courseData.matNumber = auth.matNumber;
        const course = Course.create(courseData);
        const message = 'Course added successfully'; // Set the success message
        res.render('result.ejs', { message });
    } catch (err) {
        console.log(err);
    }

});
app.get('/dashboard', requireLogin, async (req: Request, res: Response) => {
    const authCookie = req.cookies.auth;

    if (!authCookie) {
        return res.redirect('/login'); // Redirect to the login page if the user data cookie is not found
    }

    const auth = JSON.parse(authCookie); // Parse the user data from the cookie

    res.render('dashboard.ejs', { user: auth });
});
app.get('/login', (req: Request, res: Response) => {
    res.render("login.ejs")
});
app.get('/signup', (req: Request, res: Response) => {
    res.render("signup.ejs")
});

app.get('/logout', (req: Request, res: Response) => {
    // Clear the session or authentication cookies
    res.clearCookie('auth');

    // Redirect to the login page or any other desired page
    res.redirect('/login');
});
export default app;