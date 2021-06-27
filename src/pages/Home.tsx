import React, { FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import googleIconImg from "../assets/images/google-icon.svg";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";
import { database } from "../services/firebase";

import "../styles/auth.scss";

const Home: React.FC = () => {
  const { showLoader, hideLoader } = useLoading();
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signInWithGoogle();
      }
      history.push("/rooms/new");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      toast.error("Enter room code.", {
        position: "top-right",
      });
      return;
    }

    try {
      showLoader();

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      hideLoader();

      if (!roomRef.exists()) {
        toast.error("Room does not exists.", {
          position: "top-right",
        });
        return;
      }

      if (roomRef.val().endedAt) {
        toast.error("Room already closed.", {
          position: "top-right",
        });
        return;
      }

      history.push(`/rooms/${roomCode}`);
    } catch (error) {
      toast.error("Server error.", {
        position: "top-right",
      });
      hideLoader();
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
