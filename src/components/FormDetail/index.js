/**
 * Created by Administrator on 2017/12/13 0013.
 */
import React, { Component } from 'react';
import { Row, Col, Form, Input, Divider} from 'antd'
import FormItem from "antd/lib/form/FormItem.d";

export default class FormDetail extends Component{
    render(){
      const { getFieldDecorator } = props.form;
      return <div>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">
                <FormItem label="姓名">
                  {
                    getFieldDecorator('realName',{

                    })(<Input type="text"/>)
                  }
                </FormItem>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">{
                <FormItem label="性别">
                  {
                    getFieldDecorator('sex',{
                    })(<Input type="text"/>)
                  }
                </FormItem>
              }</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">
                <FormItem label="年龄">
                  {
                    getFieldDecorator('age',{
                    })(<Input type="text"/>)
                  }
                </FormItem>
              </div>
            </Col>
          </Row>
      </div>
    }
}

