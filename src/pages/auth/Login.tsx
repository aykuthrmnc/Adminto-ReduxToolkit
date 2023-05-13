import { Button, Alert } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';
import { login } from '../../redux/auth';
import { RootState } from '../../redux';
import { useRedux } from '../../hooks';

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
};

/* bottom links */
// const BottomLink = () => {
//     const { t } = useTranslation();

//     return (
//         <Row className="mt-3">
//             <Col xs={12} className="text-center">
//                 <p className="text-muted">
//                     <Link to="/auth/forget-password" className="text-muted ms-1">
//                         <i className="fa fa-lock me-1"></i>
//                         {t('Forgot your password?')}
//                     </Link>
//                 </p>
//                 <p className="text-muted">
//                     {t("Don't have an account?")}{' '}
//                     <Link to={'/auth/register'} className="text-dark ms-1">
//                         <b>{t('Sign Up')}</b>
//                     </Link>
//                 </p>
//             </Col>
//         </Row>
//     );
// };

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();
    const { user, loading, error } = appSelector((state:RootState) => ({
        user: state.Auth.user.data,
        loading: state.Auth.user.loading,
        error: state.Auth.user.error,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Lütfen geçerli bir kullanıcı adı giriniz.')),
            password: yup.string().required(t('Lütfen parolanızı giriniz.')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(login({ email: formData['email'], password: formData['password'] }));
    };

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            {user && <Navigate to={redirectUrl} replace />}

            <AuthLayout>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Sign In')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: 'adminto@coderthemes.com', password: 'test' }}>
                    <FormInput
                        type="text"
                        name="email"
                        label={t('Kullanıcı Adı')}
                        placeholder={t('Kullanıcı Adınızı Giriniz')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Parola')}
                        type="password"
                        name="password"
                        placeholder="Parolanızı Giriniz"
                        containerClass={'mb-3'}></FormInput>

                    {/* <FormInput
                        type="checkbox"
                        name="checkbox"
                        label={t('Remember me')}
                        containerClass={'mb-3'}
                        defaultChecked
                    /> */}

                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Giriş Yap')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
