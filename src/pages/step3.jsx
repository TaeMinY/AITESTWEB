import { useEffect, useState } from "react";
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

  cursor: pointer;
`;
function Step3() {
  const naviagte = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      naviagte("/step4");
    }, 5000);
  }, []);

  return (
    <StepContainer>
      <Title>분석 진행 중</Title>
      <Text>잠시만 기다려주세요.</Text>
      <LottieContainer>
        <Lottie animationData={loadingLottie} />
        <LottieText>분석 중..</LottieText>
      </LottieContainer>
    </StepContainer>
  );
}
export default Step3;
