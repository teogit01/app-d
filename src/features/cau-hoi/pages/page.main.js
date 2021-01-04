import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import callApi from 'api/apiCaller';
// import PropTypes from 'prop-types';

// PageMain.propTypes = {

// };

function PageMain(props) {
    const [cauhois, setCauhois] = useState([])
    useEffect(() => {
        const LOADCAUHOI = async () => {
            const data = await callApi('cau-hoi')
            if (data) {
                setCauhois(data.data.cauhois)
            }
        }
        LOADCAUHOI()
    }, [])

    const [cauhoiRender, setCauhoiRender] = useState([])
    const [pageMax, setPageMax] = useState(0)
    const [pageCurent, setPageCurent] = useState(0)
    useEffect(() => {
        if (cauhois.length > 0) {
            setPageMax(Math.ceil(cauhois.length) / 10)
            const cauhoi = cauhois.slice(pageCurent * 10, pageCurent * 10 + 10)
            setCauhoiRender(cauhoi)
        }
    }, [cauhois])

    const [number, setNumber] = useState([])
    useEffect(() => {
        const t = []
        for (let i = 0; i < pageMax; i++) {
            t.push(i)
        }
        setNumber(t)
    }, [pageMax])

    useEffect(() => {
        const cauhoi = cauhois.slice(pageCurent * 10, pageCurent * 10 + 10)
        setCauhoiRender(cauhoi)
    }, [pageCurent])
    return (
        <div className='page-main'>
            {/* <Card>
                <CardHeader className='bg-info text-left text-white'>Danh sách câu hỏi</CardHeader>

                <Card>                    

                </Card>
            </Card> */}
            <h3>Danh sách câu hỏi</h3>
            <br />
            {
                cauhoiRender.length > 0 &&
                cauhoiRender.map(cauhoi => {
                    return (
                        <div key={cauhoi._id}>
                            <Card>
                                <CardHeader className='bg-cauhoi-item' id={`id-${cauhoi._id}`}>Noi dung {cauhoi.noidung}</CardHeader>
                                <UncontrolledCollapse toggler={`#id-${cauhoi._id}`}>
                                    <CardBody>
                                        {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
                                        <CardText>
                                            {cauhoi.phuongans.map(item => {
                                                return (
                                                    <div key={item._id} className={item.dapan ? 'phuongan-item da' : 'phuongan-item'}>
                                                        <div className='phuongan-item-ten'>({item.ten})</div>
                                                        <div>{item.noidung}</div>
                                                    </div>
                                                )
                                            })}
                                        </CardText>
                                    </CardBody>
                                </UncontrolledCollapse>
                            </Card>
                        </div>
                    )
                })
            }
            <div className='phan-trang'>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled>
                        <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem >
                        <PaginationLink previous onClick={() => setPageCurent(pageCurent != 0 ? pageCurent - 1 : pageCurent)} />
                    </PaginationItem>
                    {
                        number && number.map(item => {
                            return (
                                <PaginationItem active={item === pageCurent} >
                                    <PaginationLink onClick={() => setPageCurent(item)}>
                                        {item + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                    <PaginationItem>
                        <PaginationLink next onClick={() => setPageCurent(pageCurent != pageMax - 1 ? pageCurent + 1 : pageCurent)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" />
                    </PaginationItem>
                </Pagination>
            </div>
        </div >
    );
}

export default PageMain;