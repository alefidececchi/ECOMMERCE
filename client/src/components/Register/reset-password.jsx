import s from './resetPassword.module.scss'

const ResetPassword = () => {
    return (
        <div className={s.container}>

            <h3>Email has been sent!</h3>
            <h4>Please check your inbox for instructions</h4>
            <h4>   on how to reset the password</h4>
        </div>
    );
};

export default ResetPassword;
