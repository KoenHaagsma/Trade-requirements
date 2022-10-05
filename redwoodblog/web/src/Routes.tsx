import { Private, Router, Route, Set } from '@redwoodjs/router'
import PostsLayout from 'src/layouts/PostsLayout'
import BlogLayout from 'src/layouts/BlogLayout'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
    return (
        <Router>
            <Private unauthenticated="home">
                <Set wrap={PostsLayout}>
                    <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
                    <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
                    <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
                    <Route path="/admin/posts" page={PostPostsPage} name="posts" />
                </Set>
            </Private>
            <Set wrap={BlogLayout}>
                <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
                <Route path="/contact" page={ContactPage} name="contact" />
                <Route path="/about" page={AboutPage} name="about" />
                <Route path="/" page={HomePage} name="home" />
            </Set>
            <Route path="/login" page={LoginPage} name="login" />
            <Route path="/signup" page={SignupPage} name="signup" />
            <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
            <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
            <Route notfound page={NotFoundPage} />
        </Router>
    )
}

export default Routes
