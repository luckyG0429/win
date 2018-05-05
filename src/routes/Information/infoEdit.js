/** 资讯添加 -
 * **/

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, Input,Select,Button,Modal,Upload,Card, Icon} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddTeam from '../../components/Team/AddTeam';

import styles from './info.less';
import {datetimeToTimestamp, handleResult} from "../../utils/utils";

const FormItem = Form.Item;

@connect(state => ({
  infolist: state.infolist,
}))

@Form.create()

export default class InfoEdit extends PureComponent{
  state = {


    btnloading:false,
    fileList:[]

  }

  componentWillMount(){
    //请求一个赛事分类类型的枚举数据
    const {dispatch} = this.props;
    dispatch({
      type:'infolist/typefetch'
    })
  }

  componentDidMount(){
    //请求目前已有的全部战队列表
    this.setFetch();
  }

  handleModalVisible=(flag=false,record={},type=0)=>{
    this.setState({
      modalVisible:flag,
      _record:record,
      modaltype: type
    })
  }

  handleStandardTableChange=(pagination,)=>{
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      ...formValues,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.setState({
      formValues: {
        ...params,
      },
    });
    this.setFetch(params);
    // dispatch({
    //   type: 'limitlist/fetch',
    //   payload: params,
    // });
  }

  handleOk = (e)=>{
    e.preventDefault();
    const {form,dispatch,modalType,data} = this.props;
    const { fileList } = this.state;


    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };

      if(!values.gameId) return false;

      this.setState({
        btnloading:true
      })

      var json = {
        gameId: values.gameId|| undefined,
        uploads: fileList ||[],
      };

      let formData = new FormData();

      fileList.forEach((item)=>{
        formData.append('uploads',item);
      })
      formData.append('gameId',json.gameId);

      dispatch({
        type:'infolist/addInformation',
        payload:formData,
        callback:(result)=>{
          handleResult(result,'添加成功',()=>{
            this.setState({
              btnloading:false
            })
          })
        }
      })

    });
  }


  handleResult = (result)=>{
    if(result.resultCode === 0){
      Modal.success({
        title: '结果反馈',
        content: '操作成功',
        onOk:()=>{this.setFetch()}
      });
    }else{
      Modal.error({
        title: '结果反馈',
        content: result.resultmsg,
      })
    }
  }

  setFetch(params){
    const {dispatch} = this.props;
    const { formValues } = this.state;
    if(!params){
      params = formValues;
    }
    dispatch({
      type:'infolist/fetch',
      payload:params
    })
  }

  callHistory=()=>{
    history.go(-1);
  }

  render(){
    //1.你的全局状态的引入
    const {infolist:{data, loading, eventType}} = this.props;
    const { getFieldDecorator } = this.props.form;

    //2.组件的状态变量的引入
    const {btnloading, fileList} = this.state;
    const optionListClass=[];
    const iconprops = {
      action: '/',
      listType:'picture',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        //创建读取文件的对象
        var reader = new FileReader();

        //创建文件读取相关的变量
        var imgFile;

        //为文件读取成功设置事件
        reader.onload=function(e) {
          // alert('文件读取完成');
          console.log(e)
          imgFile = e.target.result;
          file.url = imgFile;
          // console.log(imgFile);
        };

        //正式读取文件
        reader.readAsDataURL(file);

        console.log(file);

        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    //3.渲染
    return (<PageHeaderLayout title="资讯编辑">
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form layout="inline" style={{width:'100%',display:'block',overflow:'auto'}}  onSubmit={this.handleOk}>
                <FormItem label="比赛" {...formItemLayout}>
                  {getFieldDecorator('gameId',{
                    rules: [{
                      required: true , message: '请选择分类！',
                    }],
                    initialValue:''
                  })(<Input/>)}
                </FormItem>
                <FormItem label='图文信息' {...formItemLayout}>
                  <Upload {...iconprops}>
                    <Button>
                      <Icon type="upload" /> 上传图片
                    </Button>
                  </Upload>
                </FormItem>
                <div style={{display:'flex',flexAlign:'center',border:'1px solid #eee',height:'300px',alignItems:'center',justifyContent:'center'}}>
                  {
                    !!fileList.length?fileList.map((item,index)=>{
                      return <img key={index} width='120' height='auto' style={{marginLeft:'8px',boxShadow:'0 0 2px #222'}} src={item.url}/>
                    }):<p>暂无图片...</p>
                  }
                </div>
                <FormItem style={{textAlign:'center',marginTop:'20px'}}>
                  <Button type='primary' style={{marginRight:'20px'}}  htmlType='submit' loading={btnloading}>发布</Button>
                  <Button onClick={this.callHistory}>返回</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    )

  }

}




