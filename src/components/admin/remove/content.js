import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Question from 'features/question'
import Exam from 'features/exam'
import Test from 'features/test'
import Subject from 'features/subject'
import Class from 'features/_class'
import User from 'features/user'
import Khoi from 'features/khoi'
import TaiKhoan from 'features/tai-khoan'
import CauHoi from 'features/cau-hoi'
import Nhom from 'features/nhom'

import Notify from 'features/notify'

// import PropTypes from 'prop-types';

// Content.propTypes = {

// };

function Content(props) {
    //let { match } = props
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.url}/question`} component={Question} />
            <Route path={`${match.url}/subject`} component={Subject} />
            <Route path={`${match.url}/exam`} component={Exam} />
            <Route path={`${match.url}/test`} component={Test} />
            <Route path={`${match.url}/class`} component={Class} />
            <Route path={`${match.url}/user`} component={User} />
            <Route path={`${match.url}/khoi`} component={Khoi} />

            <Route path={`${match.url}/tai-khoan`} component={TaiKhoan} />
            <Route path={`${match.url}/cau-hoi`} component={CauHoi} />
            <Route path={`${match.url}/nhom`} component={Nhom} />

            <Route path={`${match.url}/notify`} component={Notify} />
            {/* <Route path={`${match.url}/teacher`} exact component={ListTeacher} />
            <Route path={`${match.url}/teacher/add`} component={AddTeacher} />

            <Route path={`${match.url}/subject`} component={ListSubject} />
            <Route path={`${match.url}/question`} exact component={ListQuestion} />
            <Route path={`${match.url}/question/add`} exact component={AddQuestion} />
            <Route path={`${match.url}/question/type`} component={Type} />
            <Route path={`${match.url}/question/detail`} component={DetailQuestion} />
            <Route path={`${match.url}/exam`} exact component={ListExam} />
            <Route path={`${match.url}/exam/add`} component={AddExam} />

            <Route path={`${match.url}/list`} exact component={User1} /> */}


        </Switch>
    );
}

export default Content;