<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Employee.aspx.cs" Inherits="foundry_assessment.Employee" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
    <tr>
        <td>Employee's Name:<br />
            <asp:TextBox ID="txtName" runat="server"/>
        </td>
        <td>
            <asp:Button ID="btnAdd" runat="server" Text="Add" OnClick="Insert" />
        </td>
    </tr>
    </table>
    <br />
    <hr />
    <h2>List of Employee Data</h2>
    
        <asp:GridView ID="GridViewEmployee" runat="server" AllowPaging="false" AutoGenerateColumns="false" DataKeyNames="id" EmptyDataText="No records has been added."
            OnRowDeleting="OnRowDeleting" OnRowEditing="OnRowEditing" OnRowCancelingEdit="OnRowCancelingEdit"  OnRowUpdating="OnRowUpdating" EnableViewState="false">
            <Columns>
                <asp:BoundField DataField="id" HeaderText="Id" />
                <asp:TemplateField HeaderText="Name">
            <ItemTemplate>
                <asp:Label ID="lblName" runat="server" Text='<%# Eval("name") %>'></asp:Label>
            </ItemTemplate>
            <EditItemTemplate>
                <asp:TextBox ID="txtName" runat="server" Text='<%# Eval("name") %>'></asp:TextBox>
            </EditItemTemplate>
        </asp:TemplateField>
                <asp:CommandField ShowEditButton="true" />
                <asp:CommandField ShowDeleteButton="true" />
            </Columns>
        </asp:GridView>

    <br />
    <hr />
</asp:Content>
