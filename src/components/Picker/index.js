import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import styled from 'styled-components/native';


const Picker = ({ onChange, title, dataItem, width, height }) => {

    const [valor, setValor] = useState()
    const cor = valor ? '#95d5b2' : '#FFF'

    return (
        <Container style={{
            backgroundColor: cor,
            width: width ? width : '45%',
            height: height ? height : 45
        }}>
            <RNPickerSelect
                placeholder={title}
                onValueChange={(value) => {
                    onChange(value)
                    setValor(value)
                }}
                items={dataItem}
            />
        </Container>
    )
}

export default Picker

const Container = styled.View`
    background-color: #FFF;
    justify-content: center;
    border-radius: 5px;
    height: 30px;
`;
