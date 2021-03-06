import * as React from "react";
import * as firebase from "firebase";
import { Redirect } from "react-router";
import { Form, Checkbox, Button, Menu, Icon, Sticky } from "semantic-ui-react";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";

export class Register extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    var config = {
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
  }

  handleRegister() {
    console.log("handle register");
    if (this.state.password !== this.state.passwordConfirm) {
      alert("密碼不相符");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        return;
      });
    window.location.href = "./#/login";
  }

  toIndex() {
    window.location.href = "./#/";
  }

  render() {
    return (
      <div>
        <Sticky>
          <Menu inverted>
            <Menu.Item onClick={() => this.toIndex()}>
              <Icon name='home' />
              戒毒好所在
          </Menu.Item>
          </Menu>
        </Sticky>
        <Container>
          <Form>
            <h1>註冊</h1>
            <Form.Field>
              <label>信箱</label>
              <input
                onChange={evt =>
                  this.setState({
                    email: evt.target.value
                  })
                }
                placeholder="信箱"
              />
            </Form.Field>
            <Form.Field>
              <label>密碼</label>
              <input
                type="password"
                onChange={evt =>
                  this.setState({
                    password: evt.target.value
                  })
                }
                placeholder="密碼"
              />
            </Form.Field>
            <Form.Field>
              <label>密碼確認</label>
              <input
                type="password"
                onChange={evt =>
                  this.setState({
                    passwordConfirm: evt.target.value
                  })
                }
                placeholder="密碼"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Button type="submit" onClick={() => this.handleRegister()}>
              送出
        </Button>
          </Form>
        </Container>
      </div >
    );
  }
}
