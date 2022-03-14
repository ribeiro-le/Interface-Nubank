import React from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation
} from './styles'

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import Header from '../src/components/Header'
import Tabs from '../src/components/Tabs'
import Menu from '../src/components/Menu'

import Icon from 'react-native-vector-icons/MaterialIcons';


function App() {

  let offset = 0;


  const translateY = new Animated.Value(0)

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY
        }
      }
    ],
    { useNativeDriver: true }
  )

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;

      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,

      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });



    }

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8B10AE" />
      <Container>
        <Header />

        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card
              style={{
                transform: [{
                  translateY: translateY.interpolate({
                    inputRange: [-300, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                  }),
                }],
              }}
            >
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666"></Icon>
                <Icon name="visibility-off" size={28} color="#666"></Icon>
              </CardHeader>

              <CardContent>
                <Title>Saldo disponível</Title>
                <Description>R$ 302.854,56</Description>
              </CardContent>

              <CardFooter>
                <Annotation>
                  Transferência de R$ 450,00 recebida de Leandro Ribeiro de Assis às 20:00hrs
                </Annotation>
              </CardFooter>

            </Card>
          </PanGestureHandler>

        </Content>

        <Tabs translateY={translateY} />


      </Container>
    </>
  );
}
export default App;
