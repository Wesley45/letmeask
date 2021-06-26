import React from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "../components/Button";
import { Question as QuestionComponent } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export const AdminRoom: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RoomParams>();
  const { questions, title } = useRoom(id);

  async function handleEndRoom() {
    try {
      await database.ref(`rooms/${id}`).update({
        endedAt: new Date(),
      });

      history.push("/");
    } catch (error) {}
  }

  async function handlerDeleteQuestion(questionId: string) {
    try {
      if (
        window.confirm("Tem certeza que você deseja excluir esta pergunta?")
      ) {
        await database.ref(`rooms/${id}/questions/${questionId}`).remove();
      }
    } catch (error) {}
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handlerHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={id} />
            <Button isOutlined={true} onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>4 pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <QuestionComponent
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlerHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handlerDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </QuestionComponent>
          ))}
        </div>
      </main>
    </div>
  );
};
