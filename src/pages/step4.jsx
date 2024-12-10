import { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie.json";

const StepContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px 20px;
`;

const Title = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -1.5px;
`;

const LottieContainer = styled.div`
  max-width: 360px;
  width: 100%;

  position: relative;
  letter-spacing: -1.5px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  & > div {
    width: 100%;
  }
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;

  margin: 20px 0px 40px;
`;
const LottieText = styled.div`
  position: absolute;

  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -1.5px;

  margin-bottom: 4px;
  margin-right: 2px;
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;
const Button = styled.div`
  width: 110px;
  height: 44px;
  border-radius: 100px;
  background-color: #ff0080;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: bold;
  color: white;
  padding-bottom: 2px;
`;
const Button2 = styled.div`
  width: 110px;
  height: 44px;
  border-radius: 100px;
  background-color: #0066ff;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  color: white;
  font-weight: bold;
  padding-bottom: 2px;
`;
function Step4() {
  const naviagte = useNavigate();

  return (
    <StepContainer>
      <Title>
        현재 상태는
        <br />
        화남😡 입니다.
      </Title>

      <ButtonContainer>
        <Button2
          onClick={() => {
            naviagte("/");
          }}
        >
          메인으로
        </Button2>
      </ButtonContainer>
    </StepContainer>
  );
}
export default Step4;
