import React, { useEffect, useState } from 'react';
import Detail from './../components/detail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import callApi from 'api/apiCaller';
import Select from 'react-select'
// import PropTypes from 'prop-types';

// PageDetail.propTypes = {
//     optionsQuestion: PropTypes.array
// };

function PageDetail(props) {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const history = useHistory()
    const match = useRouteMatch()
    // const redicect = () => {
    //     history.goBack()
    // }
    const { _id } = match.params
    const [detail, setDetail] = useState('')
    const _iddethi = match.params._id

    const [questions, setQuestions] = useState([]) // list question will render
    const [questionOfExam, setQuestionOfExam] = useState([]) // list question will render select

    useEffect(() => {
        const LoadDetail = async () => {
            let data = await callApi(`dethi/detail/${_id}`)
            setDetail(data.data)
        }
        const LoadQuestion = async () => {
            let data = await callApi(`cauhoi/dethi/${_iddethi}`)
            setQuestions(data.data[0].cauhois)
        }
        LoadDetail()
        LoadQuestion()
    }, [])

    useEffect(() => {
        const LoadQuestionOfExam = async () => {
            let data = await callApi(`cauhoi/mon/${detail.mon}`)
            setQuestionOfExam(data.data)
        }
        LoadQuestionOfExam()
    }, [detail])

    let optionsQuestion = []
    if (questionOfExam.length > 0) {
        questionOfExam.map(item => {
            optionsQuestion.push({ value: item, label: item.tieude })
        })
    }

    const [questionAdd, setQuestionAdd] = useState([])
    const [questionSelect, setQuestionSelect] = useState([]) // list question when select
    const handleChangeQuestion = (value) => {
        let newValue = []
        value.map(item => {
            newValue.push(item.value)
        })
        setQuestionSelect(newValue)
    }

    const [questionRemove, setQuestionRemove] = useState([])
    const handleRemove = (_id) => {
        //let newQuestionAdd = questionAdd.filter(item => item.value._id != _id)
        //setQuestionAdd(newQuestionAdd)
        let newQuestionRemove = questionRemove
        newQuestionRemove.push(_id)
        setQuestionRemove(newQuestionRemove)
        let newQuestion = questions.filter(item => item._id != _id)
        setQuestions(newQuestion)
    }

    //resectQuestionSelect
    const resectQuestionSelect = () => {
        setQuestionSelect([])
        setModal(!modal);
    }
    //saveQuestionSelect
    const saveQuestionSelect = () => {
        let newQuestions = questions.concat(questionSelect)
        let newQuestionAdd = questionAdd.concat(questionSelect)

        setQuestions(newQuestions)
        setQuestionAdd(newQuestionAdd)
        //console.log('questionSelect', questionSelect)
        setModal(!modal);
    }
    //resetQuestionAdd
    const resetQuestionAdd = () => {
        setQuestionAdd([])
    }
    const resetQuestionRemove = () => {
        setQuestionRemove([])
    }
    return (
        <div className='page-detail'>
            <div className='press-add'>
                {/* <FontAwesomeIcon className='ic-add ic-init' icon="arrow-left" onClick={redicect} /> */}
                <FontAwesomeIcon className='ic-add ic-init' icon="plus" onClick={toggle} />
            </div>
            <div>
                <Detail
                    listQuestion={questions}
                    detail={detail}
                    questionAdd={questionAdd}
                    questionRemove={questionRemove}
                    remove={handleRemove}
                    resetQuestionAdd={resetQuestionAdd}
                    resetQuestionRemove={resetQuestionRemove}
                />
            </div>

            <div>
                {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Thêm câu hỏi:</ModalHeader>
                    <ModalBody>
                        <Select
                            onChange={handleChangeQuestion}
                            options={optionsQuestion}
                            isMulti
                            closeMenuOnSelect={false}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveQuestionSelect}>Thêm</Button>
                        <Button color="primary" onClick={resectQuestionSelect}>Thoát</Button>
                        {/* <Button color="secondary" onClick={toggle}>Huỷ</Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

export default PageDetail;