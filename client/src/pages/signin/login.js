import React from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Logo from '../../components/logo/logo';

function Login(props) {
    const { isLoggedIn } = props;

    const { message } = props;
    
    const validation = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .min(6, 'Длина логина не может быть меньше 8 символов. Проверьте введенные данные')
                .max(32)
                .required('Логин обязателен для ввода'),
            password: Yup
                .string()
                .min(8, 'Длина пароля не может быть меньше 8 символов. Проверьте введенные данные')
                .max(16)
                .required('Пароль обязателен для ввода')
        }),
        onSubmit: (values) => {
            const { username, password } = values;
            const { dispatch, history } = props;
            dispatch(login(username, password))
            .then(() => {
                history.push("/");
                window.location.reload();
            })
            .catch(() => {
            })
            .finally(() => {
            });
        }
    });  

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return (
        <>
        <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
            <Box sx={{ my: 3 }}>
                <Logo />
                <Typography
                    color="textPrimary"
                    variant="h4"
                    align="center"
                >
                    Авторизация
                </Typography>
            </Box>
            <Box sx={{ my: 1}}>
            {
                    message && (
                        <Alert severity="error">
                            {message}
                        </Alert>
                    )
            }
            </Box>
            <form
                onSubmit={validation.handleSubmit}
            >
            <TextField
                error={Boolean(
                    validation.touched.username && 
                    validation.errors.username)}
                fullWidth
                helperText={
                    validation.touched.username && 
                    validation.errors.username}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                label="Логин"
                margin="normal"
                name="username"
                type="login"
                value={validation.values.username}
                variant="outlined"
                />
            <TextField
                error={Boolean(
                    validation.touched.password && 
                    validation.errors.password)}
                fullWidth
                helperText={
                    validation.touched.password && 
                    validation.errors.password}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                label="Пароль"
                margin="normal"
                name="password"
                type="password"
                value={validation.values.password}
                variant="outlined"
            />
                <Box sx={{ py: 2 }}>
                    <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Войти
                    </Button>
                </Box>
            </form>
            </Container>
      </Box>
        </>
    )
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    }
}

export default connect(mapStateToProps)(Login);

