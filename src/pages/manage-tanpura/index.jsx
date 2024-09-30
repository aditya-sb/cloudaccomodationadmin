import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'antd';
import LayoutHoc from '@/HOC/LayoutHoc';
import FilledButtonComponent from '@/components/Button';
import styles from "./styles.module.css";

import Link from 'next/link';
import DataTable from '@/components/Datatable';
import Image from 'next/image';
import { IMAGES } from '@/assest/images';
import { delTanpura, getTanpura } from '@/api/tanpura';
import Swal from 'sweetalert2';
import { deleteAlertContext } from '@/HOC/alert';

export default function ManageTanpura() {
    const [loading, setloading] = useState(false)
    const [tanpura, settanpura] = useState([])

    const deleteduser = (id) => {
        setloading(true)

        Swal.fire(deleteAlertContext).then((data) => {
            if (data.isConfirmed) {
                delTanpura(id).then((data) => {
                    console.log(data, "cheking respond is");
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    setloading(false);
                }).catch((err) => {
                    if (err) {
                        setloading(false)
                    }
                })


            }
            setloading(false)
        })

    }

    const data = [
        {
            key: "1",
            pitch: "C#",
            type: "SA-PA",
            files: "24 ",

            option: (
                <Link href="#">
                    <Image src={IMAGES.Delete} alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </Link>
            ),
        },

    ];

    const columns = [

        {
            title: "Pitch",
            dataIndex: "pitch",
            key: "pitch",
            width: "20%",
            searchable: true
            // ...getColumnSearchProps("date"),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "20%",
            searchable: true
            // ...getColumnSearchProps("date"),
        },
        {
            title: "Files",
            dataIndex: "files",
            key: "files",
            width: "40%",
            searchable: true
            // ...getColumnSearchProps("code"),
        },

        {
            title: "Action",
            dataIndex: "option",
            key: "option",
        },
    ];
    useEffect(() => {
        getTanpura().then((data) => {
            console.log(data, "deyry");
            settanpura(data?.data)

        })
    }, [loading])

    if (loading) {
        return <h6>Loading.....</h6>
    }
    return (
        <LayoutHoc>
            <Col className={`${styles.title}`}>
                <Row className={`${styles.rowTag}`}>
                    <Col md={14}>
                        <h3 style={{ position: "relative", top: "11px" }}>Manage Tanpura Music</h3>
                    </Col>
                    <Col md={10}>
                        <Col style={{ textAlign: "end" }}>
                            <Link href="/manage-tanpura/add-tanpura">  <FilledButtonComponent>Add</FilledButtonComponent></Link>
                        </Col>
                    </Col>
                </Row>

            </Col>
            <Col className="tableBox">

                <DataTable rowData={tanpura && tanpura?.length > 0 && tanpura.map((data, id) => ({
                    key: id,
                    pitch: data?.pitch,
                    type: data?.types,
                    files: data?.file1?.length,

                    option: (

                        <Image src={IMAGES.Delete} alt="" onClick={() => deleteduser(data?._id)} style={{ width: "20px", height: "20px", objectFit: "contain" }} />

                    ),
                }))} colData={columns} />
            </Col>
        </LayoutHoc>
    );
}