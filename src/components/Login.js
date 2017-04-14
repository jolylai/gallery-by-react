/**
 * Created by Jolylai on 2017/3/27.
 */
import React from 'react';
import { Input,Button,Form,Icon,Row,Col } from 'antd';

const FormItem = Form.Item;

var LoginForm = React.createClass({
  handlerClick: function (e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err ) {
        if(values.userName == '林月丹'){
          this.props.login()
        }
      }
    });
  },
  render: function() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 20},
        lg: { span: 16 },
        xl: { span: 12}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      }
    };
    return(
      <div className="login-form-wrapper" >
        <Row type="flex">
          <Col span={8} >
            <Form onSubmit={this.handlerClick} className="login-form" >
              <FormItem style={formItemLayout}>
                <span style={{color: "#fff",fontSize:"16px"}}>
                  金陵一梦 方觉春醒
                </span>
              </FormItem>
              <FormItem style={formItemLayout}>
                {getFieldDecorator('userName',{
                  rules:[{required:true,message:'请输入正确的姓名'}]
                })(
                  <Input prefix={<Icon type="user" style={{fontSize:13}}/>} placeholder="请输入你的名字"/>
                )}
              </FormItem>
              <FormItem style={formItemLayout}>
                <Button type="primary" className="login-form-button" htmlType="submit" style={{width: '100%'}}>
                  梦回南京
                </Button>
              </FormItem>
            </Form>
            </Col>
      </Row>
      </div>
    )
  }
})
const Login = Form.create()(LoginForm);
export default Login;
