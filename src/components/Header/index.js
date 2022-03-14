import React from 'react';
import { View } from 'react-native';

import { Container, Top, Logo, Title } from './styles'

import logo from '../../../src/assets/Nubank_Logo.png';

import Icon from 'react-native-vector-icons/MaterialIcons';

function Header() {
    return (
        <Container>
            <Top>
                <Logo source={logo} />
                <Title>Isabelle</Title>
            </Top>
            <Icon name="keyboard-arrow-down" size={20} color="#FFF"></Icon>
        </Container>
    );
}

export default Header;