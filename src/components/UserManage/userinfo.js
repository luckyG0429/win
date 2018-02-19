import React from 'react';
import { Card } from 'antd';
import styles from './userinfo.less';

const UserInfo= (props)=>{
  const { userdata }= props;
  return <Card>
    <div>
      <span className={styles.label}>昵称：</span>
      <span>{userdata.nickname||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>会员等级：</span>
      <span>{userdata.level||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>ID：</span>
      <span>{userdata.id||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>注册时间：</span>
      <span>{userdata.createTime||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>注册账号：</span>
      <span>{userdata.nickname||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>性别：</span>
      <span>{userdata.sexStr||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>手机号：</span>
      <span>{userdata.phone||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>拥有金币数：</span>
      <span>{userdata.money||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>被关注人数：</span>
      <span>{userdata.countMyFans||'无'}</span>
    </div>
    <div>
      <span className={styles.label}>好友数：</span>
      <span>{userdata.countMyFriends||'无'}</span>
    </div>
  </Card>
}

export default UserInfo;
