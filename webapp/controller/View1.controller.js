sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/m/BusyIndicator"
],
    function (Controller,BusyIndicator,MessageBox) {
        "use strict";
        
       
        return Controller.extend("formdesign.controller.View1", {
            onInit: function () {
                debugger
                if( JSON.parse(localStorage.getItem("reg")) == null){
                    var mainArray = JSON.stringify([]);
                              localStorage.setItem("reg", mainArray)
                  
                  }else{
                    var mainArray = localStorage.getItem("reg", mainArray);
                  }
               
                
            },






            EmployeeNameLogin: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^[A-Za-z\s]*$/;
                var oInput = this.getView().byId("EmployeeNameLogin");
                var ocheckname = this.getView().byId("EmployeeNameLogin").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckname.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            EmployeeIDLogin: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^\d+$/;
                var oInput = this.getView().byId("EmployeeIDLogin");
                var ocheckname = this.getView().byId("EmployeeIDLogin").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckname.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            PasswordLogin: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                var oInput = this.getView().byId("password");
                var ocheckname = this.getView().byId("password").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckname.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            onRegistration: function () {
                debugger
                var pDialog1
                if (!pDialog1) {
                    pDialog1 = this.loadFragment({
                        name: "formdesign.fragments.HelloDialogLogin",
                    });
                }
                pDialog1.then(function (oDialog1) {
                    oDialog1.open()
                });
            },

            onCloseDialog(oEvent) {
                debugger
                oEvent.getSource().getParent().close();
                oEvent.getSource().getParent().destroy();



            },






            ocheckbox: function () {
                debugger
                var inputType = this.getView().byId("password");
                var CheckBox = this.getView().byId("checkBox").getSelected();

                if (CheckBox) {
                    inputType.setType("Text");

                }
                else {
                    inputType.setType("Password");
                }

            },

            ocheckboxRegistration: function () {
                debugger
                var inputType1 = this.getView().byId("CreatePasswordInput");
                var inputType2 = this.getView().byId("ConfirmPasswordInput");
                var CheckBox = this.getView().byId("ShowcheckBox").getSelected();

                if (CheckBox) {
                    inputType1.setType("Text");
                    inputType2.setType("Text");

                }
                else {
                    inputType1.setType("Password");
                    inputType2.setType("Password");
                }

            },
            UserNameInputliveChange: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^[A-Za-z\s]*$/;
                var oInput = this.getView().byId("UserNameInput");
                var ocheckname = this.getView().byId("UserNameInput").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckname.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            CreatePasswordInputliveChange: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                var oInput = this.getView().byId("CreatePasswordInput");
                var ocheckname = this.getView().byId("CreatePasswordInput").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckname.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            onRegistrationForm: function (oEvent) {
                debugger
                var EmpName = this.getView().byId("UserNameInput").getValue();
                var password = this.getView().byId("CreatePasswordInput").getValue();
                var Confirmpassword = this.getView().byId("ConfirmPasswordInput").getValue();
                var namepattern = /^[A-Za-z\s]*$/;
                var Passwordpattern = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                if (EmpName.trim() === '') {
                    sap.m.MessageBox.error("Please Fill Out Employee Name!")
                }
                else if (!namepattern.test(EmpName)) {
                    sap.m.MessageBox.error("Invalid Employee Name");
                }
                else if (password.trim() === '') {
                    sap.m.MessageBox.error("Password Required!")
                }
                else if (!Passwordpattern.test(password)) {
                    sap.m.MessageBox.error("Please Fill Strong Password!")
                }
                else if (Confirmpassword !== password) {
                    sap.m.MessageBox.error("Password and Confirm Password do not match!");
                }

                else {
                   
                    let obj = {
                        EmpeName: EmpName,
                        EmpePass: password
                    }

                    var data = JSON.parse(localStorage.getItem("reg"));
                    data.push(obj); 
                    var mainArray = JSON.stringify(data);
                    var data = JSON.parse(localStorage.getItem("reg"));
                    var OldArray = []
                    var username = this.getView().byId("UserNameInput").getValue();
                    var userpass = this.getView().byId("ConfirmPasswordInput").getValue();

                     
                    for (var i = 0; i < data.length; i++) {
                        var filterdata = data[i];
                        OldArray.push(filterdata);
                }
               
                for(var j = 0; j<OldArray.length; j++){
                    if(OldArray[j].EmpeName === username || OldArray[j].EmpePass === userpass){
                        debugger
                        sap.m.MessageBox.error("This UserName or Paddword is already Saved!")
                        return;
                    }
                }
                    localStorage.setItem("reg", mainArray);
                    oEvent.getSource().getParent().close();
                    oEvent.getSource().getParent().destroy();
            }
        },

            onPage2: function () {
                var EmpName = this.getView().byId("EmployeeNameLogin").getValue();
                var EmpID = this.getView().byId("EmployeeIDLogin").getValue();
                var password = this.getView().byId("password").getValue();
                var namepattern = /^[A-Za-z\s]*$/;
                var passwordpattern = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            

                if (EmpName.trim() === '') {
                    sap.m.MessageBox.error("Please Fill Out Employee Name!")
                }
                else if (!namepattern.test(EmpName)) {
                    sap.m.MessageBox.error("Invalid Employee Name");
                }
               
                else if (EmpID.trim() === '') {
                    sap.m.MessageBox.error("Please Fill Out Employee ID!")
                }
                else if (password.trim() === '') {
                    sap.m.MessageBox.error("Password Required!")
                }
                else if (!passwordpattern.test(password)) {
                    sap.m.MessageBox.error("Please Fill Strong Password!");
                }
              

                else {
             
                    let allUserData = JSON.parse(localStorage.getItem("reg"));
                    var particularData;
                    var auth = 0,Index;
                    allUserData.forEach((element,i) => {
                        if(element.EmpeName ==  EmpName && element.EmpePass == password){
                            particularData=element;
                            auth++;
                            Index=i;
                        }
                    });
                    if(auth >0){
                        particularData.EmployeeIDLogin=EmpID
                        var model = new sap.ui.model.json.JSONModel({Data:[particularData]});
                        this.getView().setModel(model, "login1");
                        sap.ui.core.BusyIndicator.show();
    
                        this.getView().byId("EmployeeNameLogin").setValue();
                        this.getView().byId("EmployeeIDLogin").setValue();
                        this.getView().byId("password").setValue();

                        var oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteView2",{
                            json:Index+"|"+EmpID
                        });
                    }
                    else{
                        sap.m.MessageBox.error("Invalid password or UserName");
                    }
                }
            },
        });
    });
