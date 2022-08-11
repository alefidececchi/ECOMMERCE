import s from './activateAccount.module.scss'

const ActivateAccount = () => {
    return (
        <div className={s.container}>
            <h3>Email has been sent!</h3>
            <h4>Please check your inbox to activate your</h4>
            <h4>  account</h4>
        </div>
    );
};

export default ActivateAccount;
