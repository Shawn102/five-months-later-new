import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const myContext = createContext();

export const MyAppProvider = ({ children }) => {
  const [inputsOnChange, setInputOnChange] = useState({
    title: "",
    date: "",
    message: "",
  });
  const [formMessages, setFormMessages] = useState("");
  const [backEndData, setBackEndData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [isEditModeClicked, setIsModeClicked] = useState(false);
  const [editId, setEditId] = useState();
  const [axiosMessage, setAxiosMessage] = useState();
  // this for edit inputs
  const [inputChange, setInputs] = useState({
    title: "",
    date: "",
    message: "",
  });
  const OnChangeHandle = (e) => {
    const { name, value } = e.target;
    setInputOnChange({
      ...inputsOnChange,
      [name]: value,
    });
  };
  const OnSubmitHandle = (event) => {
    event.preventDefault();
    const { title, date, message } = inputsOnChange;
    if (title === "" || date === "" || message === "") {
      setFormMessages("Can't submit the form please fill all the inputs!");
    } else {
      axios
        .post("http://localhost:5000/add", inputsOnChange)
        .then((res) => {
          console.log(res);
          if (res.data) {
            setAxiosMessage(res.data.message);
            console.log(res.data.message);
            setBackEndData([...backEndData, res.data.data]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Clearing the form inputs
      setInputOnChange({
        id: "",
        title: "",
        date: "",
        message: "",
      });
      setFormMessages("Your content added successfully!");
    }
  };

  // this function for deleting the target item only
  const deleteData = useCallback(
    (id) => {
      console.log(id);
      setId(id);
      axios
        .delete("http://localhost:5000/" + id)
        .then((res) => {
          if (res.data) {
            setAxiosMessage(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [id]
  );

  // now handling onSubmit after edit
  const OnEditSubmitHandle = (event) => {
    const id = editId;
    event.preventDefault();
    const { title, date, message } = inputChange;
    if (title === "" || date === "" || message === "") {
      setFormMessages("Can't submit the form please fill all the inputs!");
    } else {
      axios
        .put("http://localhost:5000/update/" + id, inputChange)
        .then((res) => {
          console.log(res);
          if (res.data) {
            console.log(res.data);
            setAxiosMessage(res.data);
            setIsModeClicked(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // this for collecting data from back-end
  const getAllData = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:5000/")
      .then((res) => {
        if (res.data) {
          setBackEndData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllData();
  }, [deleteData]);

  // setting "axiosMessage" again undefined after 1.5s
  useEffect(() => {
    const autoTi = setTimeout(() => {
      setAxiosMessage();
    }, 10);
    return () => {
      clearTimeout(autoTi);
    };
  }, [axiosMessage]);

  return (
    <myContext.Provider
      value={{
        inputsOnChange,
        OnChangeHandle,
        OnSubmitHandle,
        formMessages,
        setFormMessages,
        setBackEndData,
        backEndData,
        isLoading,
        setAxiosMessage,
        deleteData,
        isEditModeClicked,
        setIsModeClicked,
        editId,
        setEditId,
        OnEditSubmitHandle,
        inputChange,
        setInputs,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export const MyGlobalContext = () => {
  return useContext(myContext);
};
