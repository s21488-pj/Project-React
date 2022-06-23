import React, {useState} from 'react';
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "./firebase";
import "./Poll.css"

function Poll() {

    const [serviceList, setServiceList] = useState([{answer: ""}]);
    const [question, setQuestion] = useState("");
    const ref = collection(firestore, "polls");
    const handleSave = async (e) => {

        console.log(serviceList);
        try {
            addDoc(ref, data)
        } catch (e) {
            console.log(e);
        }
    }

    let data = {
        question: question,
        answer: serviceList
    };


    const handleServiceAdd = () => {

        setServiceList([...serviceList, {answer: ""}])


    }
    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);

    }
    const handleServiceChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    }


    return (

        <form className="poll" autoComplete="off">
            <div className="form-field">
                <div className="forQuestion">
                    <div>
                        <label className="enterQuestion"><h2>Enter your question</h2></label>
                    </div>
                    <div>
                        <input className="inputQuestion" name="question" type="text" required
                               onChange={(event) => setQuestion(event.target.value)}
                        />
                    </div>
                </div>
                <label className="enterAnswer"><h3>Enter your answers:</h3> </label>
                {serviceList.map((singleService, index) => (
                    <div className="answers" key={index}>
                        <div className="first-division">
                            <input name="answer" type="text" id="answer" required
                                   value={singleService.answer}
                                   onChange={(e) => handleServiceChange(e, index)}
                            />
                            {serviceList.length - 1 === index && serviceList.length < 4 &&
                                (<button type="button" id="add-btn" onClick={handleServiceAdd}>
                                        <span>Add a Service</span>
                                    </button>
                                )}
                        </div>
                        <div className="second-division">
                            {serviceList.length > 1 && (
                                <button  onClick={() => handleServiceRemove(index)} type="button" id="remove-btn">
                                    <span>Remove</span>
                                </button>
                            )}
                        </div>
                        {serviceList.length - 1 === index && serviceList.length > 1 && question != null && (
                            <button id="submit-btn" onClick={handleSave}>
                                submit
                            </button>
                        )}
                    </div>


                ))}

            </div>

        </form>

    );
}

export default Poll;