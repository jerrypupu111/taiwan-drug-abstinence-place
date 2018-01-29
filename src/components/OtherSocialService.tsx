import * as React from "react";
import * as ReactDOM from "react-dom";
import * as firebase from "firebase";
import {
  Container,
  Form,
  Grid,
  Button,
  Image,
  Input,
  Icon,
  Table,
  Dropdown,
  Checkbox,
  Message,
  Radio
} from "semantic-ui-react";

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

const shortInput = {
  width: 100
};

const fieldset = {
  marginTop: 20,
  marginBottom: 15
};

export class OtherSocialService extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      otherResourceNum: 1,
      moneyNum: 1,
      otherPeopleNum: 1,
      otherServiceNum: 0,
      // 基本資料
      name: "",
      phone: "",
      address: "",
      email: "",
      url: "",
      alchohol: false,
      opium: false,
      stimulant: false,
      otherDrug: false,
      isMale: false,
      isFemale: false,
      isAdult: false,
      isChild: false,
      isIgnoreServere: false,
      servereDisease: "",
      isWithdral: false,
      isCourtTransfer: false,
      specialService: "",
      resources: [""],
      // 費用
      feeType: "",
      feeTypeDescription: "",
      // 人員
      doctorProType: null,
      doctorPro: null,
      doctorPartType: null,
      doctorPart: null,
      clinicalPsyPro: null,
      clinicalPsyPart: null,
      conselorPro: null,
      conselorPart: null,
      socialWorkerPro: null,
      socialWorkerPart: null,
      functionalTherapistPro: null,
      functionalTherapistPart: null,
      nursePro: null,
      nursePart: null,
      pastPro: null,
      pastPart: null,
      securityPro: null,
      securityPart: null,
      // 服務
      isFamilySupport: false,
      isHouseSupport: false,
      isFamilyCase: false,
      isDrugCase: false,
      isLifeServiceCase: false,
      isCareerTrain: false,
      isCareerSupport: false,
      isWorkSelf: false,
      isFoundSupport: false,
      isAfterClassSupport: false,
      isCaseManage: false,
      isEconomyService: false
    };
  }

  componentDidMount() {
    let iElems: any = document.getElementsByClassName("add-button");
    [...iElems].forEach(iElem => {
      iElem.onmouseover = () => {
        iElem.style.opacity = 1.0;
      };
      iElem.onmouseout = () => {
        iElem.style.opacity = 0.5;
      };
    });
    var user = firebase.auth().currentUser;
    if (user) {
      let uid = user.uid;

      db
        .collection("OtherSocialService")
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            let data = doc.data();
            console.log(data);
            this.setState(data);
          }
        });
    }
  }

  addOtherResourceNum = () => {
    var origin = this.state.otherResourceNum;
    this.setState({
      otherResourceNum: origin + 1
    });
    var origin = this.state.resources;
    origin.push("");
    this.setState({ ["resources"]: origin });
  };

  addMoneyNum = () => {
    var origin = this.state.moneyNum;
    this.setState({
      moneyNum: origin + 1
    });
  };

  addOtherPeopleNum = () => {
    var origin = this.state.otherPeopleNum;
    this.setState({
      otherPeopleNum: origin + 1
    });
  };

  addOtherServiceNum = () => {
    var origin = this.state.otherServiceNum;
    this.setState({
      otherServiceNum: origin + 1
    });
  };

  formDataChange = (e, { name, value }) => {
    console.log(name + ": " + value);
    this.setState({ [name]: value });
  };

  textAreaChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  formDataChecked = (e, data) => {
    console.log(data);
    this.setState({ [data.name]: data.checked });
  };

  formDataRadioChecked = (e, data) => {
    console.log(data);
    this.setState({ [data.name]: data.value });
    console.log(this.state);
  };

  resourceContentChange = (e, { name, value }) => {
    var elementName = name.split("_")[0];
    var sequence = name.split("_")[1];
    console.log(elementName + ": " + sequence);

    var origin = this.state.resources;
    origin[sequence] = value;
    this.setState({ ["resources"]: origin });
    console.log(this.state.resources);
  };

  handleSubmit = e => {
    var user = firebase.auth().currentUser;

    let uid = user.uid;

    var data = this.state;
    console.log(data);
    try {
      db
        .collection("OtherSocialService")
        .doc(uid)
        .set(data);
    } catch (err) {
      console.log(err);
      alert("系統錯誤，請稍後在試");
      return;
    }
    alert("儲存成功");
  };

  render() {
    var otherResourceRows = [];
    var moneyRows = [];
    var otherPeopleRows = [];
    var otherServiceRows = [];
    for (var i = 0; i < this.state.otherResourceNum; i++) {
      var elementName = "resources_" + i.toString();
      otherResourceRows.push(
        <Input
          type="text"
          name={elementName}
          value={this.state.resources[i]}
          onChange={this.resourceContentChange}
        />
      );
    }
    for (var i = 0; i < this.state.moneyNum; i++) {
      moneyRows.push(
        <Table.Row>
          <Table.Cell>
            <Input />
          </Table.Cell>
          <Table.Cell>
            <Input />
          </Table.Cell>
          <Table.Cell>
            <Input style={shortInput} />
          </Table.Cell>
          <Table.Cell>
            <Input style={shortInput} />
          </Table.Cell>
          <Table.Cell>
            <Input style={shortInput} />
          </Table.Cell>
        </Table.Row>
      );
    }
    for (var i = 0; i < this.state.otherPeopleNum; i++) {
      otherPeopleRows.push(
        <Form.Group>
          <Form.Field inline>
            <Input size="mini" type="text" placeholder="職稱" />
            <br />
            <label>專任</label>
            <input type="text" /> 人，
            <label htmlFor="">兼任</label>
            <input type="text" />人
          </Form.Field>
        </Form.Group>
      );
    }
    for (var i = 0; i < this.state.otherServiceNum; i++) {
      otherServiceRows.push(
        <div>
          <Form.Group inline>
            <Checkbox checked />
            <Input size="mini" placeholder="服務項目名稱" />
          </Form.Group>
          <Form.Group inline>
            每年約可提供<Form.Input style={shortInput} type="number" />人，<Form.Input
              style={shortInput}
              type="number"
            />人次
          </Form.Group>
          <Form.Field
            label=""
            control="textarea"
            placeholder="請以300字介紹該方案，俾利宣導"
            rows="4"
          />
        </div>
      );
    }

    return (
      <Container>
        <Message positive>
          <Message.Header>填表說明</Message.Header>
          <ul>
            <li>
              此處之心理社會復健與復歸社會服務，係指特別針對施用毒品個案或藥癮者，依其個人需求（如就學、就業、就醫、居住、職業訓練、親職教育、家庭關係修復、人際關係改善、支持系統重建…等），提供協助或所需資源連結，以減少其復發危險因子，增加保護因子，促其維持停止施用毒品，進而改善身心健康、提升生活品質及預防復發為目標之專業服務
            </li>
            <li>
              盤點範圍 (針對提供毒品施用者心理社會復健與復歸社會服務，且<b>
                非屬醫療或醫事機構，及非居住型服務
              </b>之下述二類民間組織進行盤點)
            </li>
            <ul>
              <li>機構之服務項目載明有藥癮或物質濫用者</li>
              <li>
                機構之服務項目雖未敘明藥癮或物質濫用，惟該機構有實際於社區接受他單位轉介施用毒品或藥癮個案，提供促進個案維持停止施用毒品，改變生活型態之心理社會復健與復歸社會服務者
              </li>
            </ul>
          </ul>
        </Message>
        <Form>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">基本資料</legend>
            <Form.Field required>
              <label>機構或組織名稱 (請填寫立案之機構全名)</label>
              <Input
                name="name"
                placeholder="名稱"
                value={this.state.name}
                onChange={this.formDataChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>電話 (請加註區域碼，若需撥打分機，亦請註明)</label>
              <Input
                id="phone"
                name="phone"
                placeholder="電話"
                value={this.state.phone}
                onChange={this.formDataChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>地址</label>
              <Input
                id="address"
                name="address"
                placeholder="地址"
                value={this.state.address}
                onChange={this.formDataChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>電子信箱</label>
              <Input
                id="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.formDataChange}
              />
            </Form.Field>
            <Form.Field>
              <label>網站</label>
              <Input
                id="url"
                name="url"
                placeholder="http://google.com.tw"
                value={this.state.url}
                onChange={this.formDataChange}
              />
            </Form.Field>
          </fieldset>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">個案屬性</legend>
            <Form.Group inline>
              <label>成癮物質</label>
              <Checkbox
                label="酒精"
                name="alchohol"
                checked={this.state.alchohol}
                onChange={this.formDataChecked}
              />
              <Checkbox
                label="鴉片類(如海洛因、鴉片、嗎啡)"
                name="opium"
                checked={this.state.opium}
                onChange={this.formDataChecked}
              />
              <Checkbox
                label="中樞神經興奮劑(如古柯鹼、安非他命...)"
                name="stimulant"
                checked={this.state.stimulant}
                onChange={this.formDataChecked}
              />
              <Checkbox
                label="其他(如凱他命、大麻、新興成癮物質…)"
                name="otherDrug"
                checked={this.state.otherDrug}
                onChange={this.formDataChecked}
              />
            </Form.Group>

            <Form.Group inline>
              <label>性別</label>
              <Checkbox
                label="男"
                name="isMale"
                checked={this.state.isMale}
                onChange={this.formDataChecked}
              />
              <Checkbox
                label="女"
                name="isFemale"
                checked={this.state.isFemale}
                onChange={this.formDataChecked}
              />
            </Form.Group>
            <Form.Group inline>
              <label>年齡</label>
              <Checkbox
                label="成年"
                name="isAdult"
                checked={this.state.isAdult}
                onChange={this.formDataChecked}
              />
              <Checkbox
                label="未成年"
                name="isChild"
                checked={this.state.isChild}
                onChange={this.formDataChecked}
              />
            </Form.Group>
            <Form.Group inline>
              <label>是否排除重大身體疾病或精神疾病個案</label>
              <Form.Radio
                label="是"
                value="true"
                name="isIgnoreServere"
                onChange={this.formDataRadioChecked}
                checked={this.state.isIgnoreServere === "true"}
              />
              <Form.Radio
                label="否"
                name="isIgnoreServere"
                value="false"
                onChange={this.formDataRadioChecked}
                checked={this.state.isIgnoreServere === "false"}
              />
              {this.state.isIgnoreServere === "true" && (
                <Form.Field>
                  <label>請說明排除之疾病</label>
                  <Input
                    name="servereDisease"
                    placeholder="名稱"
                    onChange={this.formDataChange}
                    value={this.state.servereDisease}
                  />
                </Form.Field>
              )}
            </Form.Group>

            <Form.Group inline>
              <label>是否有生理戒斷處遇</label>
              <Form.Radio
                label="是"
                value="true"
                name="isWithdral"
                onChange={this.formDataRadioChecked}
                checked={this.state.isWithdral === "true"}
              />
              <Form.Radio
                label="否"
                value="false"
                name="isWithdral"
                onChange={this.formDataRadioChecked}
                checked={this.state.isWithdral === "false"}
              />
            </Form.Group>
            <Form.Group inline>
              <label>是否接受法院裁定或地檢署轉介之個案</label>
              <Form.Radio
                label="是"
                value="true"
                name="isCourtTransfer"
                onChange={this.formDataRadioChecked}
                checked={this.state.isCourtTransfer === "true"}
              />
              <Form.Radio
                label="否"
                value="false"
                name="isCourtTransfer"
                onChange={this.formDataRadioChecked}
                checked={this.state.isCourtTransfer === "false"}
              />
            </Form.Group>
            <Form.TextArea
              label="其他特殊服務(請說明：如愛滋個案、合併家暴、合併精神疾病…等)"
              placeholder="其他特殊服務"
              name="specialService"
              value={this.state.specialService}
              onChange={this.formDataChange}
            />
          </fieldset>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">
              服務項目與服務量能(可複選)
            </legend>
            <Form.Field>
              <Checkbox
                label="家屬支持服務方案"
                name="isFamilySupport"
                checked={this.state.isFamilySupport}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isFamilySupport && (
              <div>
                <Form.Group inline>
                  每年約可服務<Form.Input style={shortInput} type="number" />個家庭，一年共約服務<Form.Input
                    style={shortInput}
                    type="number"
                  />家庭次、<Form.Input style={shortInput} type="number" />人次
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、理念、次數、時間、頻次等資訊，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="居家關懷服務方案"
                name="isHouseSupport"
                checked={this.state.isHouseSupport}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isHouseSupport && (
              <div>
                <Form.Group inline>
                  每年約可服務<Form.Input style={shortInput} type="number" />人，一年共約服務<Form.Input
                    style={shortInput}
                    type="number"
                  />人次
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、理念、次數、時間、頻次等資訊，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="個案家屬自助團體"
                name="isFamilyCase"
                checked={this.state.isFamilyCase}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isFamilyCase && (
              <div>
                <Form.Group inline>
                  每年約可提供<Form.Input style={shortInput} type="number" />個團體，每個團體<Form.Input
                    style={shortInput}
                    type="number"
                  />人
                </Form.Group>
                <Form.Group inline>
                  一年約服務<Form.Input style={shortInput} type="number" />人次或<Form.Input
                    style={shortInput}
                    type="number"
                  />團次
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該團體方案，如方式、內容、對象、理念、次數、時間及頻次等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="毒品個案自助團體"
                name="isDrugCase"
                checked={this.state.isDrugCase}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isDrugCase && (
              <div>
                <Form.Group inline>
                  每年約可提供<Form.Input style={shortInput} type="number" />個團體，每個團體<Form.Input
                    style={shortInput}
                    type="number"
                  />人
                </Form.Group>
                <Form.Group inline>
                  一年約服務<Form.Input style={shortInput} type="number" />人次或<Form.Input
                    style={shortInput}
                    type="number"
                  />團次
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該團體方案，如方式、內容、對象、理念、次數、時間及頻次等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="個案自立生活服務及租屋津貼方案"
                name="isLifeServiceCase"
                checked={this.state.isLifeServiceCase}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isLifeServiceCase && (
              <div>
                <Form.Group inline>
                  每年約可服務<Form.Input style={shortInput} type="number" />人，每名個案每月補助<Form.Input
                    style={shortInput}
                    type="number"
                  />元，補助<Form.Input style={shortInput} type="number" />個月
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、補助費用等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="職業訓練方案"
                name="isCareerTrain"
                checked={this.state.isCareerTrain}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isCareerTrain && (
              <div>
                <Form.Group inline>
                  每年約可培訓<Form.Input style={shortInput} type="number" />人
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、培訓時間等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="支持或陪伴就業服務方案"
                name="isCareerSupport"
                checked={this.state.isCareerSupport}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isCareerSupport && (
              <div>
                <Form.Group inline>
                  每年約可服務<Form.Input style={shortInput} type="number" />人
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、服務人員、時間等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="就業培力方案"
                name="isWorkSelf"
                checked={this.state.isWorkSelf}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isWorkSelf && (
              <div>
                <Form.Group inline>
                  每年約可協助<Form.Input style={shortInput} type="number" />人
                  穩定就業
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、培力地點等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="創業輔導方案"
                name="isFoundSupport"
                checked={this.state.isFoundSupport}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isFoundSupport && (
              <div>
                <Form.Group inline>
                  每年約可協助<Form.Input style={shortInput} type="number" />人
                  順利創業
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="課後輔導方案"
                name="isAfterClassSupport"
                checked={this.state.isAfterClassSupport}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isAfterClassSupport && (
              <div>
                <Form.Group inline>
                  每年約可服務<Form.Input style={shortInput} type="number" /> 人
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該方案，如方式、內容、對象、地點、服務人員等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="個案管理服務（包括個案需求評估、資源連結、轉介及轉介後之追蹤）"
                name="isCaseManage"
                checked={this.state.isCaseManage}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isCaseManage && (
              <div>
                <Form.Group inline>
                  可提供之個管案量比為１：<Form.Input
                    style={shortInput}
                    type="number"
                  />
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹個管服務模式，如方式、內容、流程或頻次等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <Form.Field>
              <Checkbox
                label="福利服務、經濟扶助或急難救助"
                name="isEconomyService"
                checked={this.state.isCaseManage}
                onChange={this.formDataChecked}
              />
            </Form.Field>
            {this.state.isCaseManage && (
              <div>
                <Form.Group inline>
                  扶助額度<Form.Input style={shortInput} type="number" />元/人，約<Form.Input
                    style={shortInput}
                    type="number"
                  />人/年
                </Form.Group>
                <Form.Field
                  required
                  label="說明"
                  control="textarea"
                  placeholder="請以300字介紹該項服務，如方式、內容、申請流程或金額等，俾利宣導"
                  rows="4"
                />
              </div>
            )}
            <h3>其他（請參照上列服務說明方案名稱、方案內容及服務量能）</h3>
            {otherServiceRows}
            <Icon
              onClick={this.addOtherServiceNum}
              name="add circle"
              size="big"
              className="add-button"
              style={{ opacity: 0.5 }}
            />請點選"+"，新增說明內容
          </fieldset>
          <fieldset>
            <legend className="ui dividing header">服務費用收取方式</legend>
            <Form.Field>
              <Form.Radio
                label="完全自費"
                value="total"
                name="feeType"
                onChange={this.formDataRadioChecked}
                checked={this.state.feeType === "total"}
              />
              {this.state.feeType === "total" && (
                <Form.Field
                  required
                  label="請說明收費項目及費用"
                  control="textarea"
                  rows="3"
                  name="feeTypeDescription"
                  onChange={this.textAreaChange}
                  value={this.state.feeTypeDescription}
                />
              )}
              <Form.Radio
                label="部分補助"
                value="part"
                name="feeType"
                onChange={this.formDataRadioChecked}
                checked={this.state.feeType === "part"}
              />
              {this.state.feeType === "part" && (
                <Form.Field
                  required
                  label="請說明補助條件及補助額度"
                  control="textarea"
                  rows="3"
                  name="feeTypeDescription"
                  onChange={this.textAreaChange}
                  value={this.state.feeTypeDescription}
                />
              )}
              <Form.Radio
                label="全部免費"
                value="free"
                name="feeType"
                onChange={this.formDataRadioChecked}
                checked={this.state.feeType === "free"}
              />
              {this.state.feeType === "free" && (
                <Form.Field
                  required
                  label="請說明費用來源"
                  control="textarea"
                  rows="3"
                  name="feeTypeDescription"
                  onChange={this.textAreaChange}
                  value={this.state.feeTypeDescription}
                />
              )}
              <Form.Radio
                label="其他"
                value="other"
                name="feeType"
                onChange={this.formDataRadioChecked}
                checked={this.state.feeType === "other"}
              />
              {this.state.feeType === "other" && (
                <Form.Field
                  required
                  label="請說明收費方式及費用"
                  control="textarea"
                  rows="3"
                  name="feeTypeDescription"
                  onChange={this.textAreaChange}
                  value={this.state.feeTypeDescription}
                />
              )}
            </Form.Field>
          </fieldset>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">人力配置</legend>
            <h3>行政人員</h3>
            <Form.Group>
              <Form.Field inline>
                <label>專任</label>
                <Input
                  type="number"
                  name="adminPro"
                  value={this.state.adminPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="adminPart"
                  value={this.state.adminPart}
                  onChange={this.formDataChange}
                />
                人
              </Form.Field>
            </Form.Group>
            <h3>處遇人員</h3>
            <Form.Group>
              <Form.Field inline>
                <h4>醫師</h4>
                <label>專任</label>
                <Input
                  type="text"
                  name="doctorProType"
                  value={this.state.doctorProType}
                  onChange={this.formDataChange}
                />
                科
                <Input
                  type="number"
                  name="doctorPro"
                  value={this.state.doctorPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="text"
                  name="doctorPartType"
                  value={this.state.doctorPartType}
                  onChange={this.formDataChange}
                />
                科
                <Input
                  type="number"
                  name="doctorPart"
                  value={this.state.doctorPart}
                  onChange={this.formDataChange}
                />
                人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>臨床心理師</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="clinicalPsyPro"
                  value={this.state.clinicalPsyPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="clinicalPsyPart"
                  value={this.state.clinicalPsyPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>諮商心理師</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="conselorPro"
                  value={this.state.conselorPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="conselorPart"
                  value={this.state.conselorPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>社會工作師/社工員</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="socialWorkerPro"
                  value={this.state.socialWorkerPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="socialWorkerPart"
                  value={this.state.socialWorkerPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>職能治療師</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="functionalTherapistPro"
                  value={this.state.functionalTherapistPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="functionalTherapistPart"
                  value={this.state.functionalTherapistPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>護理師/護士</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="nursePro"
                  value={this.state.nursePro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="nursePart"
                  value={this.state.nursePart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>過來人</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="pastPro"
                  value={this.state.pastPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="pastPart"
                  value={this.state.pastPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <h4>保全人員</h4>
                <label>專任</label>
                <Input
                  type="number"
                  name="securityPro"
                  value={this.state.securityPro}
                  onChange={this.formDataChange}
                />
                人，
                <label htmlFor="">兼任</label>
                <Input
                  type="number"
                  name="securityPart"
                  value={this.state.securityPart}
                  onChange={this.formDataChange}
                />人
              </Form.Field>
            </Form.Group>
            <h3>其他</h3>
            {otherPeopleRows}
            <Icon
              onClick={this.addOtherPeopleNum}
              name="add circle"
              size="big"
              className="add-button"
              style={{ opacity: 0.5 }}
            />請點選"+"，新增說明內容
          </fieldset>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">
              外部合作或連結資源（請說明合作單位或連結之資源，及使用情況或量能）
            </legend>
            <Form.Group>
              <Form.Field>
                <h4>範例：有固定就業協力廠商____家，每年提供____個職缺）</h4>
                {otherResourceRows}
                <Icon
                  onClick={this.addOtherResourceNum}
                  name="add circle"
                  size="big"
                  className="add-button"
                  style={{ opacity: 0.5 }}
                />請點選"+"，新增說明內容
              </Form.Field>
            </Form.Group>
          </fieldset>
          <fieldset style={fieldset}>
            <legend className="ui dividing header">機構經費來源</legend>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  label="自籌(包括募款)"
                  name="isSelfRaise"
                  checked={this.state.isSelfRaise}
                  onChange={this.formDataChecked}
                />
              </Form.Field>
              {this.state.isSelfRaise && (
                <Form.Field inline>
                  每年約新台幣<Input
                    type="number"
                    name="selfRaisaAmount"
                    value={this.state.selfRaisaAmount}
                    onChange={this.formDataChange}
                  />
                  元
                </Form.Field>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  label="向公部門申請補助(請提供近3年補助單位及受補助額度)"
                  name="isSupplementory"
                  checked={this.state.isSupplementory}
                  onChange={this.formDataChecked}
                />
                {this.state.isSupplementory && (
                  <Table celled structured>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell rowSpan="2">
                          補助單位
                        </Table.HeaderCell>
                        <Table.HeaderCell rowSpan="2">
                          申請補助項目
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3">
                          每年補助金額(元)
                        </Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell>104年</Table.HeaderCell>
                        <Table.HeaderCell>105年</Table.HeaderCell>
                        <Table.HeaderCell>106年</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {moneyRows}
                    <Table.Row>
                      <Table.Cell>
                        <Icon
                          onClick={this.addMoneyNum}
                          name="add circle"
                          size="big"
                          className="add-button"
                          style={{ opacity: 0.5 }}
                        />請點選"+"，新增說明內容
                      </Table.Cell>
                      <Table.Cell />
                      <Table.Cell />
                      <Table.Cell />
                      <Table.Cell />
                    </Table.Row>
                  </Table>
                )}
              </Form.Field>
            </Form.Group>
          </fieldset>
          <Button
            type="submit"
            size="massive"
            floated="right"
            onClick={this.handleSubmit}
          >
            儲存
          </Button>
        </Form>
      </Container>
    );
  }
}
