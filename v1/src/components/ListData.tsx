import * as React from "react";

import { Redirect } from "react-router";

import * as firebase from "firebase";
import "@firebase/firestore";

import { Grid, Dropdown, Image, Sticky, Menu, Icon } from "semantic-ui-react";

import { TimeTable } from "./TimeTable";

const config = {
  apiKey: "AIzaSyAYfnhC1GbxA7q-HQYDWI_6fHWNArNQ-y0",
  authDomain: "taiwan-drug-abstinence-p-2edf5.firebaseapp.com",
  databaseURL: "https://taiwan-drug-abstinence-p-2edf5.firebaseio.com",
  projectId: "taiwan-drug-abstinence-p-2edf5",
  storageBucket: "taiwan-drug-abstinence-p-2edf5.appspot.com",
  messagingSenderId: "933584242007"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
let db = firebase.firestore();
let storageRef = firebase.storage().ref();

export class ListData extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      attritube: "",
      AgencyOptions: [],
      agencyvalue: "",
      agency: "",
      Doctoroptions: [],
      doctorvalue: "",
      doctor: ""
    };

    this.handleAttritubeChange = this.handleAttritubeChange.bind(this);
    this.handleAgencyChange = this.handleAgencyChange.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
  }

  toIndex() {
    window.location.href = "./#/";
  }

  render() {
    return (
      <div>
        <Menu inverted className="fixed">
          <Menu.Item onClick={() => this.toIndex()}>
            <Icon name="home" />
            戒毒好所在
          </Menu.Item>
        </Menu>
        <h6>機構列表</h6>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <label
                style={{ textAlign: "left", fontSize: "1.5em", padding: "5px" }}
              >
                機構屬性
              </label>
              <Dropdown
                selection
                placeholder="屬性"
                options={Attritubeoptions}
                onChange={this.handleAttritubeChange}
                value={this.state.attritube}
              />
            </Grid.Column>
          </Grid.Row>
          {this.state.attritube && (
            <Grid.Row>
              <Grid.Column>
                <label
                  style={{
                    textAlign: "left",
                    fontSize: "1.5em",
                    padding: "5px"
                  }}
                >
                  機構名稱
                </label>
                <Dropdown
                  selection
                  placeholder="名稱"
                  options={this.state.AgencyOptions}
                  onChange={this.handleAgencyChange}
                  value={this.state.agencyvalue}
                />
              </Grid.Column>
            </Grid.Row>
          )}
          {this.state.agencyvalue && (
            <Grid.Row>
              <Grid.Column>
                <Grid celled>
                  <Grid.Row style={header}>
                    <Grid.Column width="16">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "1.5em",
                          padding: "5px"
                        }}
                      >
                        資料簡介
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      機構名稱
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.name}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      網站
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.website}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      地區
                    </Grid.Column>
                    <Grid.Column width="12">
                      {Area[this.state.agency.area]}{" "}
                      {Location[this.state.agency.location]}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      地址
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.address}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      電話
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.phone}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={header}>
                    <Grid.Column width="16">限制</Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      性別
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.boyChecked && "男"}{" "}
                      {this.state.agency.girlChecked && "女"}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      年齡
                    </Grid.Column>
                    <Grid.Column width="12">
                      {this.state.agency.UBage == 200 ? (
                        <div>不限</div>
                      ) : (
                        <div>
                          {this.state.agency.LBage}～{this.state.agency.UBage}
                        </div>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="4" style={item}>
                      宗教
                    </Grid.Column>
                    <Grid.Column width="12">
                      {Religon[this.state.agency.religon]}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="16" style={header}>
                      適用補助
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="16">
                      {this.state.agency.e1checked && "更生保護法"}{" "}
                      {this.state.agency.e2checked && "非鴉片類補助"}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={item}>
                    <Grid.Column width="8">處置方式</Grid.Column>
                    <Grid.Column width="8">費用</Grid.Column>
                  </Grid.Row>
                  {this.state.agency.method &&
                    this.state.agency.method.map((name, i) => {
                      return (
                        <Grid.Row key={i}>
                          <Grid.Column width="8">{name[0]}</Grid.Column>
                          <Grid.Column width="8">{name[1]}</Grid.Column>
                        </Grid.Row>
                      );
                    })}
                  {this.state.agency.OKtime && (
                    <Grid.Row>
                      <Grid.Column>
                        <TimeTable
                          OKtime={this.state.agency.OKtime}
                          style={{ padding: "5px" }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  )}
                  <Grid.Row style={header}>
                    <Grid.Column width="16">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "1.5em",
                          padding: "5px"
                        }}
                      >
                        醫生資訊
                      </label>{" "}
                      <Dropdown
                        selection
                        placeholder="醫生"
                        options={this.state.Doctoroptions}
                        onChange={this.handleDoctorChange}
                        value={this.state.doctorvalue}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {this.state.doctor && (
                    <Grid celled>
                      <Grid.Row verticalAlign="middle">
                        <Grid.Column width="4">
                          <Image src={this.state.doctor.src} />
                        </Grid.Column>
                        <Grid.Column width="12">
                          <Grid celled>
                            <Grid.Row>
                              <Grid.Column width="4" style={item}>
                                <label
                                  style={{
                                    textAlign: "left",
                                    fontSize: "1.2em",
                                    padding: "5px"
                                  }}
                                >
                                  姓名
                                </label>
                              </Grid.Column>
                              <Grid.Column width="12">
                                {this.state.doctor.name}
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width="4" style={item}>
                                <label
                                  style={{
                                    textAlign: "left",
                                    fontSize: "1.2em",
                                    padding: "5px"
                                  }}
                                >
                                  電話
                                </label>
                              </Grid.Column>
                              <Grid.Column width="12">
                                {this.state.doctor.phone}
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width="8">
                          <Grid celled>
                            <Grid.Row style={item}>
                              <Grid.Column width="16">
                                <label
                                  style={{
                                    textAlign: "left",
                                    fontSize: "1.2em",
                                    padding: "5px"
                                  }}
                                >
                                  簡介
                                </label>
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width="16">
                                <div style={{ overflowWrap: "break-word" }}>
                                  {this.state.doctor.intro}
                                </div>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Grid.Column>
                        <Grid.Column width="8" verticalAlign="middle">
                          {this.state.doctor.OKtime && (
                            <TimeTable OKtime={this.state.doctor.OKtime} />
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  )}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }

  handleAttritubeChange(e, target) {
    this.setState({
      attritube: target.value
    });
    let newAgencyOptions = [];
    db
      .collection("agency")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data();
          if (data.attritube == target.value) {
            newAgencyOptions.push({
              key: doc.id,
              value: doc.id,
              text: data.name
            });
          }
        });
      });
    this.setState({
      AgencyOptions: newAgencyOptions
    });
  }

  handleAgencyChange(e, target) {
    this.setState({
      agencyvalue: target.value
    });
    db
      .collection("agency")
      .doc(target.value)
      .get()
      .then(doc => {
        this.setState({
          agency: doc.data()
        });
      });
    let newDoctorOptions = [];
    db
      .collection("agency")
      .doc(target.value)
      .collection("doctor")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          newDoctorOptions.push({
            key: doc.id,
            value: doc.id,
            text: doc.data().name
          });
        });
      });
    this.setState({
      Doctoroptions: newDoctorOptions
    });
  }

  handleDoctorChange(e, target) {
    this.setState({
      doctorvalue: target.value
    });
    db
      .collection("agency")
      .doc(this.state.agencyvalue)
      .collection("doctor")
      .doc(target.value)
      .get()
      .then(doc => {
        this.setState({
          doctor: doc.data()
        });
      });
  }

  componentWillMount() {
    console.log("perfect");
  }
}

const Attritubeoptions = [
  { key: "A1", value: "A1", text: "醫療" },
  { key: "A2", value: "A2", text: "中途之家" },
  { key: "A3", value: "A3", text: "心理諮商" }
];

const Area = {
  N: "北區",
  W: "中區",
  S: "南區",
  E: "東區",
  O: "離島"
};

const Location = {
  N1: "臺北市",
  N2: "新北市",
  N3: "基隆市",
  N4: "桃園市",
  N5: "新竹市",
  N6: "新竹縣",
  N7: "宜蘭縣",
  W1: "苗栗縣",
  W2: "臺中市",
  W3: "彰化縣",
  W4: "南投縣",
  W5: "雲林縣",
  S1: "嘉義市",
  S2: "嘉義縣",
  S3: "臺南市",
  S4: "高雄市",
  S5: "屏東縣",
  E1: "花蓮縣",
  E2: "臺東縣",
  O1: "金門縣",
  O2: "澎湖縣",
  O3: "連江縣"
};

const Religon = {
  R1: "不限",
  R2: "基督教",
  R3: "伊斯蘭教",
  R4: "印度教",
  R5: "佛教"
};

const header = {
  backgroundColor: "rgb(219,220,221)"
};

const item = {
  backgroundColor: "rgb(249,250,251)"
};

// rgba(0,0,0,.87)
