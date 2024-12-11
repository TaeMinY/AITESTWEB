
import { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie.json";
import { useNavigate, useParams } from "react-router-dom";
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

const LottieText = styled.div`
  position: absolute;
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -1.5px;
  margin-bottom: 4px;
  margin-right: 2px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0px 40px;
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
  cursor: pointer;
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
  cursor: pointer;
`;

function Step2() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          console.log("녹음 데이터 수신 완료", e.data);
          setAudioBlob(e.data); // Blob 데이터 저장
          setIsRecording(false); // 녹음 상태 false로 설정
        };

        setMediaRecorder(recorder);

        // 녹음 시작: 컴포넌트가 로드되자마자 자동으로 녹음 시작
        recorder.start();
        setIsRecording(true);
        console.log("컴포넌트 로드 후 녹음 시작");
      })
      .catch((err) => {
        console.error("마이크 접근이 거부되었습니다:", err);
      });
  }, []);

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("녹음 종료");
    }
  };

  const analyzeAudio = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      // 녹음 중일 경우 녹음을 멈추고 ondataavailable 이벤트를 기다립니다.
      console.log("녹음을 종료하고 분석을 준비합니다...");
      stopRecording();
    } else if (audioBlob) {
      // 녹음이 끝난 후 Blob 데이터를 분석합니다.
      console.log("녹음된 오디오 데이터:", audioBlob);
      // 추가 로직: 서버 전송, 데이터 처리 등
    } else {
      console.log("녹음된 음성이 없습니다. 먼저 녹음을 진행해주세요.");
    }
  };
  const request = async () => {
    if (!audioBlob) {
      console.log("녹음된 음성이 없습니다. 먼저 녹음을 진행해주세요.");
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    try {
      const response = await fetch("http://218.49.161.54:3000/upload_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      console.log("분석 결과:", data);
      naviagte(`/step4/${data.confidence}`)

      

    } catch (error) {
      console.error("분석 요청 중 오류 발생:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const restartRecording = () => {
    stopRecording(); // 기존 녹음 중단
    setTimeout(() => {
      if (mediaRecorder) {
        mediaRecorder.start(); // 녹음을 다시 시작
        setIsRecording(true);
        setAudioBlob(null); // 이전 데이터 초기화
      }
    }, 100);
  };

  return (
    <StepContainer>
      <Title>
        {isAnalyzing ? "분석 중..." : isRecording ? "녹음 중" : "녹음 멈춤"}
      </Title>      
      <Text>
        목소리를 녹음 후,
        <br />
        분석하기 버튼을 눌러주세요.
      </Text>
      {!isRecording ? 
      <LottieContainer onClick={request}>
        <Lottie animationData={loadingLottie} width={"100%"} /> 
          <LottieText>{isAnalyzing ? "분석 중..." : "분석하기"}</LottieText>
      </LottieContainer>: <LottieContainer onClick={analyzeAudio}>
        <Lottie animationData={loadingLottie} width={"100%"} /> 
        <LottieText>녹음 끝내기</LottieText>
      </LottieContainer>}
      <ButtonContainer>
        {/* <Button onClick={stopRecording}>녹음 정지</Button> */}
        <div style={{ width: "10px" }}></div>
        <Button2 onClick={restartRecording}>다시 녹음</Button2>
      </ButtonContainer>
    </StepContainer>
  );
}

export default Step2;