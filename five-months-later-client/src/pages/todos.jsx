import React, { useState } from "react";
import { MyGlobalContext } from "../Context";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import PopUp from "../Components/PopUp";
import { Link } from "react-router-dom";
import Edit from "../Components/edit";

const Todos = () => {
  const { backEndData, isLoading, deleteData, setIsModeClicked, setEditId } =
    MyGlobalContext();
  const [modal, setModal] = useState(false);
  const [selectedID, setSelectedID] = useState("");

  // console.log(backEndData && backEndData[0]?._id);

  //   this for open popup individually for each child component of the array data
  const toggleModal = (clickedId) => {
    setModal(true);
    setSelectedID(clickedId);
  };

  // This function opening edit mode
  const OpenEditMode = (id) => {
    setIsModeClicked(true);
    setEditId(id);
  };

  if (isLoading) {
    return <h1>The Data is Loading....</h1>;
  }

  return (
    <>
      <div className="home-page-content">
        <h1>Life easier with 3M</h1>
        {backEndData?.length !== 0 ? (
          <div className="inside-content-map-place">
            {backEndData?.map((values) => {
              const { _id: id, message, title, date } = values;
              return (
                <div key={id} className="style-of-content">
                  <h2>{title}</h2>

                  <h5>{date}</h5>
                  <p>{`${message.slice(0, 25)}....`}</p>
                  <div className="buttons-todos-flex">
                    <Link
                      to={`/singlecontent/${id}`}
                      className="links single-page"
                    >
                      See More
                    </Link>
                    <button
                      onClick={() => {
                        OpenEditMode(id);
                      }}
                      className="button-absolute"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => toggleModal(id)}
                      className="button-absolute"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                  {modal && id === selectedID && (
                    <PopUp
                      deleteData={deleteData}
                      id={id}
                      title={title}
                      setModal={setModal}
                      setSelectedID={setSelectedID}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <h1>You don't have any content</h1>
        )}
      </div>
      <Edit />
    </>
  );
};

export default Todos;
