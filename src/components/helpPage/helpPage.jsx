import React, { useEffect } from "react";
import { MessageList } from "@chatscope/chat-ui-kit-react";
import ChatLayout from "../chatContainer/chatLayout";
import { useMessengerContext } from "../../contexts/messenger/messengerContext";
import { useParams } from "react-router-dom";

const HelpPage = () => {
  const params = useParams();
  const { selectedChat, setSelectedChat, selectUser } = useMessengerContext();

  useEffect(() => {
    setSelectedChat({
      id: "helpChat",
      type: "help",
      name: "Help",
      avatarImageBase64:
        "https://res.cloudinary.com/dbfyj3cs4/image/upload/v1699014634/egruiunxww5uoa9zeint.jpg",
    });
    selectUser(null);
  }, [params]);

  useEffect(() => {
    const helpContent = document.querySelector(".container-help");
    helpContent.children[0].scrollTop = 0;
  }, [selectedChat]);

  return (
    <ChatLayout
      headerName={selectedChat?.name}
      headerAvatar={selectedChat?.avatarImageBase64}
    >
      <MessageList className="container-help">
        <MessageList.Content
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          <div>
            <div className="pb-3 pl-4 container-fluid">
              <div className="row">
                <div className="pr-sm-5 col-md-6 col-12">
                  <h2 className="mt-3">Исходная информация</h2>
                  <div className="mb-2">
                    - При первом входе загрузка данных с сервера может
                    затянуться в пределах ~30 секунд. Это связано с тем, что
                    хостинг, на котором развернут сервер, в неактивном состоянии
                    находится в "спящем" режиме. Поэтому нужно немного
                    подождать, пока он запустится.
                  </div>
                  <div className="mb-2">
                    - Чтобы протестировать общение, зарегестрируйтесь и войдите
                    в еще один аккаунт в режиме инкогнито нового окна браузера
                    или в окне другого браузера.
                  </div>
                  <div className="mb-2">
                    - Чтобы найти другого пользователя и начать с ним чат,
                    начните вводить его имя в поле поиска
                  </div>
                </div>

                <div className="pr-sm-5 col-md-6 col-12">
                  <h2 className="mt-3">Возможности</h2>
                  <ul>
                    <li>
                      Регистрация и вход под любыми не занятыми учётными данными
                    </li>
                    <li>Поиск пользователей или групп по имени</li>
                    <li>Чат с любым пользователем в приложении</li>
                    <li>
                      Создание групповых чатов с возможностью добавления
                      пользователей, которые есть в вашем списке чатов, и
                      добавление других пользователей через поиск
                    </li>
                    <li>Счетчик непрочитанных сообщений</li>
                    <li>
                      Прокрутка к верхнему из непрочитанных сообщений при
                      переходе в чат
                    </li>
                    <li>Время отправки сообщений</li>
                    <li>
                      Сортировка списка чатов в зависимости от времени
                      последнего сообщения
                    </li>
                    <li>
                      Аватарки автоматически генерируются с инициалами имени
                      пользователя при отсутствии изображения
                    </li>
                    <li>
                      Загрузка аватарки пользователя или группы, с возможностью
                      предварительной обрезки и масштабирования
                    </li>
                    <li>Отзывчивая разметка</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </MessageList.Content>
      </MessageList>
    </ChatLayout>
  );
};

export default HelpPage;
