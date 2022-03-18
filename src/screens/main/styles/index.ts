import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Button = styled.TouchableOpacity`
  flex: 1;
  width: 90%;
  margin: 10px;
  border-color: black;
  border-width: 1px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: black;
  font-size: 50px;
  font-weight: bold;
`
