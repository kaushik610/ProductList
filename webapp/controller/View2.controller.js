sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/m/BusyIndicator"
],
    function (Controller, MessageBox, MessageToast, DateFormat,BusyIndicator) {
        "use strict";

        return Controller.extend("formdesign.controller.View2", {
            onInit: function () {
                debugger

                this._oUploadSet = this.byId("uploadSet");
                this._oList = this.byId("uploadedFilesList");
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView2").attachPatternMatched(this.onObjectMatched, this);
                var currentDate = new Date();
                var oDateFormat = DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
                var formattedDate = oDateFormat.format(currentDate);
                var oInput = this.byId("Dateofapplication");
                oInput.setValue(formattedDate);
                this.showImage = false;

            },

            onObjectMatched(oEvent) {
                debugger;
                sap.ui.core.BusyIndicator.hide()


                var mainIndex = oEvent.getParameter("arguments").json.split("|");
                var alluserData = JSON.parse(localStorage.getItem('reg'));
                var Index = JSON.parse(mainIndex[0]);

                var mainObject = alluserData[Index]
                mainObject.EmpID = mainIndex[1];
                var oModel = new sap.ui.model.json.JSONModel(mainObject);
                this.getView().setModel(oModel, "myModel");

                debugger

                if (mainObject.EmpeName === "Actioner" && mainObject.EmpePass === "Actioner@123"
                ) {
                    this.getView().byId("ActionerSection").setVisible(true);
                    this.getView().byId("VerifierSection").setVisible(false);
                    this.getView().byId("RequesterSection").setVisible(true);

                }
                else if (mainObject.EmpeName === "Verifier" && mainObject.EmpePass === "Verifier@123") {
                    this.getView().byId("ActionerSection").setVisible(false);
                    this.getView().byId("VerifierSection").setVisible(true);
                    this.getView().byId("RequesterSection").setVisible(true);

                }
                else if (mainObject.EmpeName === "User" && mainObject.EmpePass === "User@123") {
                    this.getView().byId("ActionerSection").setVisible(true);
                    this.getView().byId("VerifierSection").setVisible(true);
                    this.getView().byId("RequesterSection").setVisible(true);

                }
                else {
                    this.getView().byId("ActionerSection").setVisible(false);
                    this.getView().byId("VerifierSection").setVisible(false);
                    this.getView().byId("RequesterSection").setVisible(true);

                }
            },

            async onclear() {
                debugger
                var that = this;
                MessageBox.confirm("You want to cancel the form.", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        debugger
                        if (sAction === "OK") {
                            that.getView().byId("EmployeeID").setValue("");
                            that.getView().byId("EmployeeName").setValue("");
                            that.getView().byId("ApplicationNo").setValue("");
                            that.getView().byId("languageSelect").setValue("");
                            that.getView().byId("Request").setValue("I Want Residence Certificate");
                            that.getView().byId("input1").setValue("");
                            that.getView().byId("myInput").setValue("");
                            that.getView().byId("Remarks").setValue("");
                            that.getView().byId("VisaCompony").setValue("");
                            that.getView().byId("input2").setValue("");
                            that.getView().byId("PrimaryEmailID").setValue("");
                            that.getView().byId("WorkingCompony").setValue("");
                            that.getView().byId("languageSelect").setValue("Gujarati");
                            that.getView().byId("hideInputsRadioButton").setSelected(true);
                            that.getView().byId("checkBox2").setSelected(true);
                            that.getView().byId("showInputsRadioButton").setSelected(false);
                            that.getView().byId("checkBox1").setSelected(false);
                            that.getView().byId("input1").setVisible(false);
                            that.getView().byId("input2").setVisible(false);
                            that.getView().byId("myLabel").setVisible(false);
                            that.getView().byId("myInput").setVisible(false);
                            that.getView().byId("fileuploder").setValue();
                            MessageToast.show("Form Rejected");
                        }

                    },
                });
            },
            onclear1: function () {
                debugger
                this.byId("ObjectPageLayout").setSelectedSection(this.byId("RequesterSection"));
                var error = this.getView().byId("error");
                error.setText("Your Form Is rejected by Verifier");
                this.getView().byId("error").setVisible(true)
                error.setType("Error");
                setTimeout(() => {
                    this.getView().byId("error").setVisible(false)
                }, 10000);

                var ApplicationNo = this.getView().byId("ApplicationNo").getValue();
                var newvalue = parseInt(ApplicationNo) + 1;
                this.getView().byId("ApplicationNo").setValue(newvalue);


                this.getView().byId("RequestNo").setValue();
                this.getView().byId("RequestDate").setValue();
                this.getView().byId("ApplicantEmployeeNo").setValue();
                this.getView().byId("Request1").setValue();
                this.getView().byId("RequesterEmployeeNo").setValue();
                this.getView().byId("Format1").setValue();
                this.getView().byId("EmployeeName1").setValue();
                this.getView().byId("Language").setValue();
                this.getView().byId("PersonalEmailID").setValue();
                this.getView().byId("VisaCompany1").setValue();
                this.getView().byId("WorkingCompany1").setValue();
                this.getView().byId("RequesterComments").setValue();
                this.getView().byId("verifierComments").setValue();
                this.getView().getModel("jsonImg1").setData([])

            },

            onclear2: function () {
                debugger
                this.byId("ObjectPageLayout").setSelectedSection(this.byId("RequesterSection"));
                var error = this.getView().byId("error");
                error.setText("Your Form Is rejected by Actioner");
                error.setType("Error");
                error.setVisible(true);
                setTimeout(() => {
                    this.getView().byId("error").setVisible(false)
                }, 10000);

                var ApplicationNo = this.getView().byId("ApplicationNo").getValue();
                var newvalue = parseInt(ApplicationNo) + 1;
                this.getView().byId("ApplicationNo").setValue(newvalue);


                this.getView().byId("ApplicantEmployeeNo1").setValue();
                this.getView().byId("RequesterEmployeeNo1").setValue();
                this.getView().byId("EmployeeName2").setValue();
                this.getView().byId("Request2").setValue();
                this.getView().byId("PersonalEmailID1").setValue();
                this.getView().byId("Format2").setValue();
                this.getView().byId("Language2").setValue();
                this.getView().byId("VisaCompany2").setValue();
                this.getView().byId("WorkingCompany2").setValue();
                this.getView().byId("RequesterComments2").setValue();
                this.getView().byId("VerifierComments2").setValue();
                this.getView().byId("ActionerComments2").setValue();
                this.getView().getModel("docDataModel").setData([]);


            },

            onShowInputsSelect: function (oEvent) {
                var oView = this.getView();
                var oLabel1 = oView.byId("label1");
                var oInput1 = oView.byId("input1");
                var oLabel2 = oView.byId("label2");
                var oInput2 = oView.byId("input2");

                oLabel1.setVisible(true);
                oInput1.setVisible(true);
                oLabel2.setVisible(true);
                oInput2.setVisible(true);
            },

            onHideInputsSelect: function (oEvent) {

                var oView = this.getView();
                var oLabel1 = oView.byId("label1");
                var oInput1 = oView.byId("input1");
                var oLabel2 = oView.byId("label2");
                var oInput2 = oView.byId("input2");

                oLabel1.setVisible(false);
                oInput1.setVisible(false);
                oLabel2.setVisible(false);
                oInput2.setVisible(false);
            },


            setinput: function () {
                debugger
                var oView = this.getView();
                var oCheckBox1 = oView.byId("checkBox1").getSelected();
                var oCheckBox2 = oView.byId("checkBox2").getSelected();

                if (oCheckBox1 === true) {
                    debugger
                    this.getView().byId("Format1").setValue("Soft Copy");

                }

                if (oCheckBox2 === true) {
                    debugger
                    this.getView().byId("Format1").setValue("Hard copy");

                }
            },


            onCheckBox1Select: function () {
                var oCheckBox1 = this.byId("checkBox1");
                var oCheckBox2 = this.byId("checkBox2");
                var oLabel = this.byId("myLabel");
                var oInput = this.byId("myInput");

                if (oCheckBox1.getSelected()) {
                    oCheckBox2.setSelected(false);
                    oLabel.setVisible(true);
                    oInput.setVisible(true);
                } else {
                    oLabel.setVisible(false);
                    oInput.setVisible(false);
                }
                this.setinput();
            },

            onCheckBox2Select: function () {
                var oCheckBox1 = this.byId("checkBox1");
                var oCheckBox2 = this.byId("checkBox2");
                var oLabel = this.byId("myLabel");
                var oInput = this.byId("myInput");

                if (oCheckBox2.getSelected()) {
                    oCheckBox1.setSelected(false);
                    oLabel.setVisible(false);
                    oInput.setVisible(false);
                } else {
                    if (oCheckBox1.getSelected()) {
                        oLabel.setVisible(true);
                        oInput.setVisible(true);
                    } else {
                        oLabel.setVisible(false);
                        oInput.setVisible(false);
                    }
                }


                this.setinput();
            },
            liveChangeEmployeeName: function (oEvent) {

                var sValue = oEvent.getParameter("value");
                const rege = /^[A-Za-z\s]*$/;
                var oInput = this.getView().byId("EmployeeName");
                var ocheckname = this.getView().byId("EmployeeName").getValue();

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
            livechangePrimaryEmailID: function (oEvent) {
                debugger

                var sValue = oEvent.getParameter("value");
                const rege = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var oInput = this.getView().byId("PrimaryEmailID");
                var oCHECK = this.getView().byId("PrimaryEmailID").getValue();

                if (rege.test(sValue)) {
                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (oCHECK.trim() === "") {
                    oInput.setValueState("None");

                }

                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },
            livechangePersonalEmailID: function (oEvent) {
                debugger
                var sValue = oEvent.getParameter("value");
                const rege = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var oInput = this.getView().byId("myInput");
                var ocheckpemail = this.getView().byId("myInput").getValue();

                if (rege.test(sValue)) {

                    oInput.setValueState("None");
                    this.email = true;
                }
                else if (ocheckpemail.trim() === "") {
                    oInput.setValueState("None");

                }
                else {
                    oInput.setValueState("Error");
                    this.email = false;
                }
            },

            async onsubmit() {
                debugger

                
                var that = this;

                MessageBox.confirm("You want to submit the form.", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        debugger
                        if (sAction === "OK") {

                            var oEmployeeID = that.getView().byId("EmployeeID").getValue();
                            var oinput1 = that.getView().byId("input1").getValue();
                            var checkbox = that.getView().byId("hideInputsRadioButton").getSelected();
                            if (checkbox) {
                                that.getView().byId("ApplicantEmployeeNo").setValue(oEmployeeID)
                                that.getView().byId("RequesterEmployeeNo").setValue(oEmployeeID)
                            }
                            if (!checkbox) {
                                that.getView().byId("ApplicantEmployeeNo").setValue(oEmployeeID);
                                that.getView().byId("RequesterEmployeeNo").setValue(oinput1);
                            }

                            var EmpName = that.getView().byId("EmployeeName").getValue();
                            var EmpID = that.getView().byId("EmployeeID").getValue();
                            var date = that.getView().byId("Dateofapplication").getValue();
                            var ApplicationNo = that.getView().byId("ApplicationNo").getValue();
                            var PrimaryEmailID = that.getView().byId("PrimaryEmailID").getValue();
                            var input1 = that.getView().byId("input1").getValue();
                            var input2 = that.getView().byId("input2").getValue();
                            var Request = that.getView().byId("Request").getValue();
                            var pemail = that.getView().byId("myInput").getValue();
                            var ApplicantEmployeeNo = that.getView().byId("ApplicantEmployeeNo").getValue();
                            var RequesterEmployeeNo = that.getView().byId("RequesterEmployeeNo").getValue();
                            var languageSelect = that.getView().byId("languageSelect").getValue();
                            var VisaCompony = that.getView().byId("VisaCompony").getValue();
                            var WorkingCompony = that.getView().byId("WorkingCompony").getValue();
                            var Remarks = that.getView().byId("Remarks").getValue();
                            // var hello = that.getView().byId("uploadSet").getItems();

                            debugger

                            // var filelenghth = that.getView().byId("uploadSet").mAggregations.items.length
                            // var fileNames = []
                            // for (var i = 0; i < filelenghth; i++) {
                            //     var value = that.getView().byId("uploadSet").mAggregations.items[i].mProperties.fileName
                            //     fileNames.push({ name: value })
                            // }
                            // var json = new sap.ui.model.json.JSONModel({
                            //     "Data": fileNames
                            // })
                            // that.getView().setModel(json, "jsonFileNames")
                            // var oUploadSet = that.getView().byId("uploadSet");
                            // var aItems = oUploadSet.getItems();




                            var oCheckBox1 = that.getView().byId("checkBox1").getSelected();
                            var oCheckBox2 = that.getView().byId("checkBox2").getSelected();
                            var oRadioButton1 = that.getView().byId("hideInputsRadioButton").getSelected();
                            var oRadioButton2 = that.getView().byId("showInputsRadioButton").getSelected();
                            var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            var namepattern = /^[A-Za-z\s]*$/;

                            if (EmpName.trim() === '') {
                                MessageBox.error("Please Fill Out Employee Name!");
                            }
                            // else if (!namepattern.test(EmpName)) {
                            //     MessageBox.error("Invalid Employee Name");
                            // }
                            // else if (EmpID.trim() === '') {
                            //     MessageBox.error("Please Fill Out Employee ID!");
                            // }
                            // else if (ApplicationNo.trim() === '') {
                            //     MessageBox.error("Please Fill Out Application No!");
                            // }
                            // else if (!oRadioButton1 && !oRadioButton2) {
                            //     MessageBox.error("At least one radiobutton (Self or Subordinate) must be selected.");
                            // }
                            // else if (oRadioButton2 === true && input1.trim() === '') {
                            //     MessageBox.error("Please Fill Out Employee id!");
                            // }
                            // else if (oRadioButton2 === true && input2.trim() === '') {
                            //     MessageBox.error("Please Fill Out Employee details!");
                            // }
                            // else if (!oCheckBox1 && !oCheckBox2) {
                            //     MessageBox.error("At least one checkbox (Soft Copy or Hard Copy) must be selected.")
                            // }
                            // else if (oCheckBox1 === true && pemail.trim() === '') {
                            //     MessageBox.error("Please Fill Out Personal Email ID !");
                            // }
                            // else if (oCheckBox1 === true && !emailPattern.test(pemail)) {
                            //     MessageBox.error("Invalid Personal Email  Address");
                            // }
                            // else if (PrimaryEmailID.trim() === '') {
                            //     MessageBox.error("Please Fill Out Primary Email Address!");
                            // }
                            // else if (!emailPattern.test(PrimaryEmailID)) {
                            //     MessageBox.error("Invalid Primary Email Address");
                            // }
                            // else if (VisaCompony.trim() === '') {
                            //     MessageBox.error("Please Fill Out VisaCompony!");
                            // }
                            // else if (WorkingCompony.trim() === '') {
                            //     MessageBox.error("Please Fill Out WorkingCompony!");
                            // }
                            // else if (Remarks.trim() === '') {
                            //     MessageBox.error("Please Fill Out Remarks!");
                            // }
                            else {
                                debugger
                                // that.getView().byId("ViewAttachment").setVisible(true);
                                that.getView().byId("Clarification2").setVisible(true);
                                that.byId("ObjectPageLayout").setSelectedSection(that.byId("VerifierSection"));
                                var obj = {
                                    "Data": [{
                                        "EmployeeName": EmpName,
                                        "EmployeeID": EmpID,
                                        "Date": date,
                                        "ApplicationNo": ApplicationNo,
                                        "Request": Request,
                                        "myInput": pemail,
                                        "ApplicantEmployeeNo": ApplicantEmployeeNo,
                                        "RequesterEmployeeNo": RequesterEmployeeNo,
                                        "languageSelect": languageSelect,
                                        "VisaCompony": VisaCompony,
                                        "WorkingCompony": WorkingCompony,
                                        "Remark": Remarks,
                                        "FileName": that.filename


                                    }]
                                }

                                var model = new sap.ui.model.json.JSONModel(obj);
                                that.getView().setModel(model, "ModelForm1");
                                MessageToast.show("Form Submitted");


                                that.getView().byId("myInput").setValue();
                                that.getView().byId("PrimaryEmailID").setValue();
                                that.getView().byId("VisaCompony").setValue();
                                that.getView().byId("WorkingCompony").setValue();
                                that.getView().byId("input2").setValue();
                                that.getView().byId("input1").setValue();
                                that.getView().byId("fileuploder").setValue();
                                that.getView().byId("languageSelect").setValue("Gujarati");
                                that.getView().byId("Remarks").setValue();
                                that.getView().byId("checkBox1").setSelected(false);
                                that.getView().byId("checkBox2").setSelected(true);
                                that.getView().byId("input1").setVisible(false);
                                that.getView().byId("input2").setVisible(false);
                                that.getView().byId("myLabel").setVisible(false);
                                that.getView().byId("myInput").setVisible(false);
                                that.getView().byId("hideInputsRadioButton").setSelected(true);
                                that.getView().byId("showInputsRadioButton").setSelected(false);
                                // that.getView().byId("uploadSet").removeAllItems();

                            }
                        }
                    }
                });


            },



            // onChangeImage: function (oEvent) {
            //     debugger
            //     if (oEvent.getSource().oFileUpload.files.length > 0) {
            //         var file = oEvent.getSource().oFileUpload.files[0];
            //         var path = URL.createObjectURL(file);
            //         var json = new sap.ui.model.json.JSONModel(
            //             {
            //                 "img": [{
            //                     "imgSrc": path
            //                 }]
            //             }
            //         )
            //         this.getView().setModel(json, "jsonImg")
            //     }
            // },


            //     ViewAttachment:function(oEvent){
            //         debugger

            //         if (!this.showImage) {
            //             this.getView().byId("imageContainer").setVisible(true);
            //             this.getView().byId("imglabel").setVisible(true);
            //             this.getView().byId("ViewAttachment").setText('Hide Attachment');
            //             this.showImage = true;
            //         } else {
            //             this.getView().byId("imageContainer").setVisible(false);
            //             this.getView().byId("imglabel").setVisible(false);
            //             this.getView().byId("ViewAttachment").setText('View Attachment');
            //             this.showImage = false;
            //         }


            //  },

            onSubmit1: function () {
                debugger
                var docData = this.getView().getModel("jsonImg1").getData();
                var RequestNo = this.getView().byId("RequestNo").getValue();
                var RequestDate = this.getView().byId("RequestDate").getValue();
                var ApplicantEmployeeNo = this.getView().byId("ApplicantEmployeeNo").getValue();
                var Request1 = this.getView().byId("Request1").getValue();
                var RequesterEmployeeNo = this.getView().byId("RequesterEmployeeNo").getValue();
                var Format1 = this.getView().byId("Format1").getValue();
                var EmployeeName1 = this.getView().byId("EmployeeName1").getValue();
                var Language = this.getView().byId("Language").getValue();
                var PersonalEmailID = this.getView().byId("PersonalEmailID").getValue();
                var VisaCompany1 = this.getView().byId("VisaCompany1").getValue();
                var WorkingCompany1 = this.getView().byId("WorkingCompany1").getValue();
                var RequesterComments = this.getView().byId("RequesterComments").getValue();
                var verifierComments = this.getView().byId("verifierComments").getValue();


                if (RequestNo.trim() === '') {
                    MessageBox.error("Please Fill Out Request No!");
                }

                else {

                    // this.getView().byId("ViewAttachment1").setVisible(true);
                    this.getView().byId("Clarification1").setVisible(false);
                    this.byId("ObjectPageLayout").setSelectedSection(this.byId("ActionerSection"));
                    debugger
                    // var picdata = this.getView().getModel("jsonFileNames").getData().Data;
                    // var arrValues = []

                    // for (var i = 0; i < picdata.length; i++) {
                    //     var values = this.getView().getModel("jsonFileNames").getData().Data[i].name;
                    //     arrValues.push(values)
                    //     debugger
                    //     var picData = {
                    //         "data": [{
                    //             "fileData": arrValues,
                    //         }]
                    //     }

                    //     var model = new sap.ui.model.json.JSONModel(picData);
                    //     this.getView().setModel(model, "FileData");
                    // }

                    var obj = {
                        "Data": [{
                            "RequestNo": RequestNo,
                            "RequestDate": RequestDate,
                            "ApplicantEmployeeNo": ApplicantEmployeeNo,
                            "Request": Request1,
                            "RequesterEmployeeNo": RequesterEmployeeNo,
                            "Format": Format1,
                            "EmployeeName": EmployeeName1,
                            "Language": Language,
                            "PersonalEmailID": PersonalEmailID,
                            "VisaCompany": VisaCompany1,
                            "WorkingCompany": WorkingCompany1,
                            // "uploadfile": uploadfile,
                            "RequesterComments": RequesterComments,
                            "verifierComments": verifierComments

                        }]


                    }
                    var model = new sap.ui.model.json.JSONModel(obj);
                    this.getView().setModel(model, "ModelForm2");

                    // var json = {
                    //     "obj":[{
                    //         "docData":


                    //     }]
                    // }
                    var model = new sap.ui.model.json.JSONModel({
                        "data":docData
                    });
                    this.getView().setModel(model, "docDataModel");


                    var error = this.getView().byId("error");
                    error.setText("Your Form Is Approved by Verifier");
                    error.setType("Success");
                    error.setVisible(true);
                    setTimeout(() => {
                        this.getView().byId("error").setVisible(false)
                    }, 10000);


                    // this.getView().byId("ViewAttachment").setVisible(false);
                    this.getView().byId("RequestNo").setValue();
                    this.getView().byId("RequestDate").setValue();
                    this.getView().byId("ApplicantEmployeeNo").setValue();
                    this.getView().byId("Request1").setValue();
                    this.getView().byId("RequesterEmployeeNo").setValue();
                    this.getView().byId("Format1").setValue();
                    this.getView().byId("EmployeeName1").setValue();
                    this.getView().byId("Language").setValue();
                    this.getView().byId("PersonalEmailID").setValue();
                    this.getView().byId("VisaCompany1").setValue();
                    this.getView().byId("WorkingCompany1").setValue();
                    this.getView().byId("RequesterComments").setValue();
                    this.getView().byId("verifierComments").setValue();
                    this.getView().getModel("jsonImg1").setData([])

                    // this.getView().byId("Uplodedfile").setVisible(true);
                    // this.getView().byId("List").setVisible(true);




                }

            },


            // onChangeImage1: function (oEvent) {
            //     debugger
            //     if (oEvent.getSource().oFileUpload.files.length > 0) {
            //         var file = oEvent.getSource().oFileUpload.files[0];
            //         var path = URL.createObjectURL(file);
            //         var json = new sap.ui.model.json.JSONModel(
            //             {
            //                 "img": [{
            //                     "imgSrc": path
            //                 }]
            //             }
            //         )
            //         this.getView().setModel(json, "jsonImg1")
            //     }
            // },

            //     ViewAttachment1:function(oEvent){
            //         debugger

            //         if (!this.showImage) {
            //             this.getView().byId("imageContainer1").setVisible(true);
            //             this.getView().byId("imglabel1").setVisible(true);
            //             this.getView().byId("ViewAttachment1").setText('Hide Attachment');

            //             this.showImage = true;
            //         } else {
            //             this.getView().byId("imageContainer1").setVisible(false);
            //             this.getView().byId("imglabel1").setVisible(false);
            //             this.getView().byId("ViewAttachment1").setText('View Attachment');
            //             this.showImage = false;
            //         }


            //  },

            onsubmit2: function () {
                debugger
                var EmpName = this.getView().byId("EmployeeName").getValue();
                var EmpID = this.getView().byId("EmployeeID").getValue();
                var date = this.getView().byId("Dateofapplication").getValue();

                var ApplicationNo = this.getView().byId("ApplicationNo").getValue();
                var newvalue = parseInt(ApplicationNo) + 1;
                this.getView().byId("ApplicationNo").setValue(newvalue);

                var RequestNo1 = this.getView().byId("RequestNo1").getValue();
                var RequestDate1 = this.getView().byId("RequestDate1").getValue();
                var ApplicantEmployeeNo1 = this.getView().byId("ApplicantEmployeeNo1").getValue();
                var RequesterEmployeeNo1 = this.getView().byId("RequesterEmployeeNo1").getValue();
                var EmployeeName2 = this.getView().byId("EmployeeName2").getValue();
                var Request2 = this.getView().byId("Request2").getValue();
                var PersonalEmailID1 = this.getView().byId("PersonalEmailID1").getValue();
                var Format2 = this.getView().byId("Format2").getValue();
                var Language2 = this.getView().byId("Language2").getValue();
                var VisaCompany2 = this.getView().byId("VisaCompany2").getValue();
                var WorkingCompany2 = this.getView().byId("WorkingCompany2").getValue();
                var RequesterComments2 = this.getView().byId("RequesterComments2").getValue();
                var VerifierComments2 = this.getView().byId("VerifierComments2").getValue();
                var ActionerComments2 = this.getView().byId("ActionerComments2").getValue();
                var documents = this.getView().getModel("docDataModel").getData()




                var obj = {
                    "Data": [{
                        "EmployeeName": EmpName,
                        "EmployeeID": EmpID,
                        "Date": date,
                        "ApplicationNo": ApplicationNo,
                        "RequestNo": RequestNo1,
                        "RequestDate": RequestDate1,
                        "ApplicantEmployeeNo": ApplicantEmployeeNo1,
                        "Request": Request2,
                        "RequesterEmployeeNo": RequesterEmployeeNo1,
                        "Format": Format2,
                        "EmployeeName": EmployeeName2,
                        "Language": Language2,
                        "PersonalEmailID": PersonalEmailID1,
                        "VisaCompany": VisaCompany2,
                        "WorkingCompany": WorkingCompany2,
                        "documents":documents,
                        "RequesterComments": RequesterComments2,
                        "verifierComments": VerifierComments2,
                        "ActionerComments": ActionerComments2,

                    }]


                }
                var model = new sap.ui.model.json.JSONModel(obj);
                this.getView().setModel(model, "ModelForm3");


                var error = this.getView().byId("error");
                error.setText("Your Form Is Approved by Actioner");
                error.setType("Success");
                error.setVisible(true);
                setTimeout(() => {
                    this.getView().byId("error").setVisible(false)
                }, 10000);
                // this.getView().byId("ViewAttachment1").setVisible(false);
                this.getView().byId("EmployeeName").setValue();
                this.getView().byId("EmployeeID").setValue();
                this.getView().byId("RequestNo1").setValue();
                this.getView().byId("RequestDate1").setValue();
                this.getView().byId("ApplicantEmployeeNo1").setValue();
                this.getView().byId("RequesterEmployeeNo1").setValue();
                this.getView().byId("EmployeeName2").setValue();
                this.getView().byId("Request2").setValue();
                this.getView().byId("PersonalEmailID1").setValue();
                this.getView().byId("Format2").setValue();
                this.getView().byId("Language2").setValue();
                this.getView().byId("VisaCompany2").setValue();
                this.getView().getModel("docDataModel").setData([]);
                this.getView().byId("WorkingCompany2").setValue();
                this.getView().byId("RequesterComments2").setValue();
                this.getView().byId("VerifierComments2").setValue();
                this.getView().byId("ActionerComments2").setValue();
            },


            async onopendialog(oEvent) {
                debugger
                this.getView().byId("view1").setVisible(false);
                this.getView().byId("view").setVisible(false);


                if (!this.oDialog) {
                    this.oDialog = await this.loadFragment({
                        name: "formdesign.fragments.HelloDialog"
                    });
                }

                this.oDialog.open();
                var text1 = this.getView().byId("text1").getText();
                var text2 = this.getView().byId("text2").getText();

                if (text1.trim() === '') {
                    this.getView().byId("label01").setVisible(false);
                    this.getView().byId("text1").setVisible(false);
                    this.getView().byId("label02").setVisible(true);
                    this.getView().byId("text2").setVisible(true);
                }
                if (text2.trim() === '') {
                    this.getView().byId("label01").setVisible(true);
                    this.getView().byId("text1").setVisible(true);
                    this.getView().byId("label02").setVisible(false);
                    this.getView().byId("text2").setVisible(false);
                }
            },

            onCloseDialog() {
                this.byId("helloDialog").close();
            },

            async onopendialog1(oEvent) {
                debugger;

                if (!this.oDialog1) {
                    this.oDialog1 = await this.loadFragment({
                        name: "formdesign.fragments.HelloDialog1"
                    });
                }

                this.oDialog1.open();
            },

            onCloseDialog1() {
                this.byId("helloDialog1").close();
            },

            async onopendialog2(oEvent) {
                debugger;

                if (!this.oDialog2) {
                    this.oDialog2 = await this.loadFragment({
                        name: "formdesign.fragments.HelloDialog2"
                    });
                }

                this.oDialog2.open();

            },

            onCloseDialog2() {
                this.byId("helloDialog2").close();
                this.getView().byId("Clarification2").setVisible(true);
                this.getView().byId("view").setVisible(false);


            },

            async onopendialog3(oEvent) {
                debugger;

                if (!this.oDialog3) {
                    this.oDialog3 = await this.loadFragment({
                        name: "formdesign.fragments.HelloDialog3"
                    });
                }

                this.oDialog3.open();
            },

            onCloseDialog3() {
                this.byId("helloDialog3").close();
            },

            async onopendialog4(oEvent) {
                debugger;

                if (!this.oDialog4) {
                    this.oDialog4 = await this.loadFragment({
                        name: "formdesign.fragments.HelloDialog4"
                    });
                }

                this.oDialog4.open();
            },

            onCloseDialog4() {
                this.byId("helloDialog4").close();
                this.getView().byId("Clarification1").setVisible(true);
                this.getView().byId("view1").setVisible(false);

            },

            clarificationsend1: function () {

                debugger

                var verifierclarification = this.getView().byId("verifierclarification").getValue();
                var clarificationpattern = /^[a-zA-Z0-9]$/

                if (verifierclarification === "") {
                    MessageBox.error("Please Enter Description of Clarification");

                }
                else if (clarificationpattern.test(verifierclarification)) {
                    MessageBox.error("Invalid Description of Clarification");
                }
                else {

                    var obj = {
                        "Data": [{
                            "verifierclarification": verifierclarification,
                        }]

                    }
                    var model = new sap.ui.model.json.JSONModel(obj);
                    this.getView().setModel(model, "ModelForm01");
                    this.getView().byId("ViewClarification").setVisible(true);

                    this.getView().byId("verifierclarification").setValue();
                    this.byId("helloDialog1").close();

                    this.getView().byId("Generictag").setVisible(true);


                }
            },





            clarificationsend() {
                debugger
                var clarification = this.getView().byId("requester").getValue();
                var verifier0001 = this.getView().byId("text1").getText();
                var actioner = this.getView().byId("text2").getText();


                if (clarification === "") {
                    MessageBox.error("Please Enter Clarification");

                }
                else {
                    if (verifier0001 === "") {
                        var obj = {
                            "Data": [{
                                "clarification": clarification,
                            }]

                        }
                        var model = new sap.ui.model.json.JSONModel(obj)
                        this.getView().setModel(model, "ModelForm03");
                        this.getView().byId("ViewClarification").setVisible(false)
                        this.getView().byId("view1").setVisible(true);
                        this.getView().byId("Clarification1").setVisible(false);
                        this.getView().byId("requester").setValue();
                        this.getView().byId("text1").getText();
                        this.getView().byId("text2").getText();
                        this.getView().byId("Generictag").setStatus("Success").setText('Clarification Send');
                        setTimeout(() => {
                            debugger
                            this.getView().byId("Generictag").setVisible(false)
                        }, 5000);
                        this.byId("helloDialog").close();


                    }
                    else if (actioner === "") {

                        var obj = {
                            "Data": [{
                                "clarification": clarification,
                            }]

                        }
                        var model = new sap.ui.model.json.JSONModel(obj);
                        this.getView().setModel(model, "ModelForm02");
                        this.getView().byId("view").setVisible(true);
                        this.getView().byId("Clarification2").setVisible(false);
                        this.getView().byId("requester").setValue();
                        this.getView().byId("text1").setText();
                        this.getView().byId("text2").setText();
                        this.getView().byId("Generictag").setStatus("Success").setText('Clarification Send');
                        setTimeout(() => {
                            debugger
                            this.getView().byId("Generictag").setVisible(false)
                        }, 5000);
                        this.byId("helloDialog").close();


                    }


                }


            },
            clarificationsend3() {
                debugger

                var clarification3 = this.getView().byId("actioner").getValue();

                if (clarification3 === "") {
                    MessageBox.error("Please Enter Description of Clarification");

                }
                else {

                    var obj = {
                        "Data": [{
                            "clarification3": clarification3,
                        }]
                    }
                    var model = new sap.ui.model.json.JSONModel(obj);
                    this.getView().setModel(model, "ModelForm03");
                    this.getView().byId("ViewClarification").setVisible(true);
                    this.getView().byId("actioner").setValue();
                    this.byId("helloDialog3").close();
                    this.getView().byId("Generictag").setVisible(true);
                    this.getView().byId("Generictag").setStatus("Error").setText('Require a Clarification');
                }
            },
            completed:function(oEvent){
                debugger
                if (oEvent.getSource().oFileUpload.files.length > 0) {
                    var files = oEvent.getSource().oFileUpload.files;
                    var imgArray = [];
                
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var path = URL.createObjectURL(file);
                        imgArray.push({ "imgSrc": path });
                        // imgArray.push({ "imgName": name });
                    }
                
                    var json = new sap.ui.model.json.JSONModel({
                        "img": imgArray
                    });
                
                    this.getView().setModel(json, "jsonImg1");
                
                    // var newjson = new sap.ui.model.json.JSONModel(imgArray);
                    // this.getView().setModel(newjson, "newJson");
                }
                
        },
    


   
        });
    });
