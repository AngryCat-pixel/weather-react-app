import React, { useState, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, selectUser } from './../authSlice';
import { selectSettings } from '../../profile/settingsSlice';
import { createSession, saveUser, serializeEmail, updateUserDataEverywhere } from '../utils';
import { useNavigate } from 'react-router-dom';
import { findUserByEmail } from '../utils/findUserByEmail';

export const Confirm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('auth');
    const settings = useSelector(selectSettings);
    const user = useSelector(selectUser);
    const [showEmail, setShowEmail] = useState(false);
    const dispatch = useDispatch();
    const styleLable = {
        position: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#006bf5',
        marginLeft: '45px',
    };

    const noErrors = {
        email: {
            error: false,
            msg: '',
        },
        activation: {
            error: false,
            msg: '',
        },
    };
    const [errors, setErrors] = useState({ ...noErrors });

    const emailRef = useRef(null);
    const codeRef = useRef(null);
    const saveBtnHandler = (e) => {
        e.preventDefault();
        setErrors({ ...noErrors });
        if (showEmail) {
            if (!emailRef.current.checkValidity()) {
                emailRef.current.reportValidity();
                return;
            }
            const newEmail = serializeEmail(emailRef.current.value);
            // проверка на доступноость email
            if (findUserByEmail(newEmail)) {
                setErrors({ email: { error: true, msg: t('incorrectregister') } });
                return;
            }
            updateUserDataEverywhere(dispatch, { ...user, email: newEmail, virificated: false }, { ...settings });
            emailRef.current.value = '';
            setShowEmail(false);
        } else {
            if (!codeRef.current.checkValidity()) {
                codeRef.current.reportValidity();
                return;
            }
            if (codeRef.current.value !== user.verificationCode) {
                // отобразить сообщение о том что код не верный
                setErrors({ activation: { error: true, msg: t('incorrectCode') } });
                return;
            }
            updateUserDataEverywhere(dispatch, { ...user, virificated: true }, { ...settings });
            codeRef.current.value = '';
            // переход на главную страницу
            navigate('/');
        }
    };

    const showEmailFormHandler = () => {
        setShowEmail(true);
        codeRef.current.value = '';
        // console.log(emailRef.current)
    };

    return (
        <Container
            maxWidth="2000px"
            fixed
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto',
            }}
        >
            <CssBaseline />
            <Button
                color="primary"
                sx={{
                    mr: 'auto',
                    mt: 3,
                    mb: 10,
                    fontWeight: 'bold',
                }}
                variant="outlined"
                startIcon={<KeyboardArrowLeftIcon />}
            >
                {t('back')}
            </Button>
            <Box
                sx={{
                    mt: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {!showEmail ? (
                    <FormControl variant="standard" sx={{ alignItems: 'center' }}>
                        <InputLabel shrink htmlFor="password-input" sx={styleLable}>
                            {t('confirm', { email: user.email })}
                        </InputLabel>
                        <TextField
                            variant="filled"
                            color="primary"
                            name="confirm"
                            id="password-input"
                            type="text"
                            inputProps={{
                                pattern: '[0-9]{4,4}',
                                title: t('codeLengthError'),
                            }}
                            error={errors.activation.error}
                            helperText={errors.activation.msg}
                            inputRef={codeRef}
                            focused
                            sx={{
                                width: '330px',
                            }}
                        />
                    </FormControl>
                ) : (
                    <FormControl variant="standard" sx={{ alignItems: 'center' }}>
                        <InputLabel shrink htmlFor="email-input" sx={styleLable}>
                            {t('changeEmailTitle')}
                        </InputLabel>
                        <TextField
                            variant="filled"
                            color="primary"
                            name="email"
                            id="email-input"
                            type="email"
                            error={errors.email.error}
                            helperText={errors.email.msg}
                            inputRef={emailRef}
                            focused
                            sx={{
                                width: '330px',
                            }}
                        />
                    </FormControl>
                )}
                <Box>
                    <Button
                        variant="outlined"
                        sx={{
                            fontWeight: 'bold',
                            mt: 3,
                            mb: 2,
                            mr: 6,
                        }}
                        onClick={saveBtnHandler}
                        type="button"
                    >
                        {t(showEmail ? 'changeEmailBtn' : 'confirmBtn')}
                    </Button>
                    {!showEmail && (
                        <Button
                            color="secondary"
                            variant="text"
                            sx={{
                                fontWeight: 'bold',
                                mt: 3,
                                mb: 2,
                            }}
                            onClick={showEmailFormHandler}
                        >
                            {t('changeEmail')}
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};
