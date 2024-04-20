import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Todo } from "../interFace/TodosInter";
import { colors } from "../colors/Colors";

const InputContent = (): JSX.Element => {
  const [values, setValues] = useState<string>("");
  const [todo, setTodo] = useState<Todo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (values.trim() !== "") {
      // create arr to get month string and not number and got Date to know when the todo was created
      const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // @ts-ignore
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = monthArr[currentDate.getMonth()];
      const formattedDate = `${date} ${month}`;

      const newTodo: Todo = {
        id: window.Date.now(),
        title: values,
        createAt: formattedDate,
        completed: false,
      };

      setTodo([...todo, newTodo]);
      setValues("");
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    const deleteTodo = todo.filter((el) => el.id !== todoId);
    setTodo(deleteTodo);
  };

  const handleCheckTodo = (todoId: number) => {
    const checkedTodo = todo.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(checkedTodo);
  };

  return (
    <>
      <Form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={values}
          placeholder="Create new task"
          onChange={(e) => setValues(e.target.value)}
        />
      </Form>
      <TodoBox>
        {todo.map((el: Todo, index) => (
          <Lists key={el.id}>
            <ListLeftContent>
              <CheckBox
                style={
                  el.completed ? { background: "rgba(67, 72, 81, 1)" } : {}
                }
                onClick={() => handleCheckTodo(el.id)}
              ></CheckBox>

              {el.completed ? (
                <CheckedP>{el.title}</CheckedP>
              ) : (
                <p>{el.title}</p>
              )}
            </ListLeftContent>
            <ListRightContent>
              <DateTime>{el.createAt}</DateTime>
              <Btn
                color={colors[index % colors.length]}
                onClick={() => handleDeleteTodo(el.id)}
              ></Btn>
            </ListRightContent>
          </Lists>
        ))}
      </TodoBox>
    </>
  );
};

export default InputContent;

const Form = styled.form`
  width: 517px;

  & > input {
    width: 100%;
    padding: 14px 20px 14px 14px;
    border-radius: 12px;
    border: none;
    outline: none;
    background-color: rgba(229, 229, 231, 1);
    color: black;

    &::placeholder {
      color: rgba(147, 147, 147, 1);
    }
  }
`;

const TodoBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const DateTime = styled.span`
  display: none;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 8px;
  color: rgba(128, 132, 138, 1);
  background: rgba(160, 172, 231, 0.1);
`;

const Lists = styled.div`
  padding: 12px 20px 12px 14px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 1);

  &:hover {
    ${DateTime} {
      display: block;
    }
  }
`;

const ListLeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckBox = styled.div`
  cursor: pointer;
  width: 19px;
  height: 19px;
  border-radius: 6px;
  background-color: rgba(234, 235, 237, 1);
`;

const Checked = styled.div`
  background-color: rgba(234, 235, 237, 1);
`;

const CheckedP = styled.div`
  opacity: 0.5;
  text-decoration: line-through;
`;

const ListRightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 11px;
  height: 11px;
  border-radius: 4px;
  border: 2px solid ${(props) => props.color};
  background-color: #ffffff;
`;
