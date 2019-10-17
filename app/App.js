import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Checkbox, Tag } from 'antd';
import './less/style.less';

@connect(({ esc }) => ({
    results: esc.results,
    total: esc.total,
    current: esc.current,
    pageSize: esc.pageSize,
    color: esc.color,
    fuel: esc.fuel,
    exhaust: esc.exhaust,
}), dispatch => ({
    dispatch
}))
export default class App extends Component {
    componentWillMount() {
        this.props.dispatch({ 'type': '初始化' })
    }
    render() {
        return (
            <div className='wrap'>
                <Row>
                    <Col span={4}>颜色：</Col>
                    <Col span={20}>
                        <Checkbox.Group
                            value={this.props.color}
                            onChange={v => {
                                this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'color', v })
                            }}
                        >
                            {
                                ['红', '黄', '蓝', '黑', '白', '绿', '灰'].map((item, index) =>
                                    <Checkbox key={index} value={item}>{item}</Checkbox>
                                )
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>燃料：</Col>
                    <Col span={20}>
                        <Checkbox.Group
                            value={this.props.fuel}
                            onChange={v => {
                                this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'fuel', v })
                            }}
                        >
                            {
                                ['油电混合', '纯电动', '柴油', '汽油'].map((item, index) =>
                                    <Checkbox key={index} value={item}>{item}</Checkbox>
                                )
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>尾气：</Col>
                    <Col span={20}>
                        <Checkbox.Group
                            value={this.props.exhaust}
                            onChange={v => {
                                this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'exhaust', v })
                            }}
                        >
                            {

                                ['国一', '国二', '国三', '国四'].map((item, index) =>
                                    <Checkbox key={index} value={item}>{item}</Checkbox>
                                )
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
                <h3>共找到{this.props.total}辆车</h3>
                <div>
                    {
                        this.props.color.length != 0 ? < Tag closable onClose={() => {
                            this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'color', 'v': [] })
                        }} >颜色：{this.props.color.join('或')}</ Tag> : null
                    }
                    {
                        this.props.fuel.length != 0 ? < Tag closable onClose={() => {
                            this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'fuel', 'v': [] })
                        }} >燃料：{this.props.fuel.join('或')}</ Tag> : null
                    }
                    {
                        this.props.exhaust.length != 0 ? < Tag closable onClose={() => {
                            this.props.dispatch({ 'type': '筛选列表_SAGA', 'k': 'exhaust', 'v': [] })
                        }} >尾气：{this.props.exhaust.join('或')}</ Tag> : null
                    }
                </div><br />

                <Table
                    rowKey='id'
                    columns={
                        [
                            {
                                'title': '图片', 'key': 'image', 'dataIndex': 'image', 'render': (txt, { id }) => {
                                    return <img src={`http://192.168.2.250:3000/images/carimages_small/${id}/view/${txt}`} />
                                }
                            },
                            { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                            { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                            { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                            { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                            { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                            { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                            { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                        ]
                    }
                    dataSource={this.props.results}
                    pagination={{
                        total: this.props.total,
                        current: this.props.current,
                        pageSize: this.props.pageSize,
                        onChange: (current) => {
                            this.props.dispatch({ 'type': '当前页_SAGA', 'current': current })
                        }

                    }}
                />
            </div>
        )
    }
}
