<%@ Page Title="Engagments" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Engagements.aspx.cs" Inherits="foundry_assessment.Engagement" Async="true"%>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Engagements Page</h1>

    <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
    <tr>
        <td> Name:<br />
            <asp:TextBox ID="txtName" runat="server"/>
        </td>
        <td>Description <br />
        <asp:TextBox ID="txtDescription" runat="server" Text='<%# Eval("description") %>'></asp:TextBox>
        </td>
        <td>
            Clients:<br />
            <asp:DropDownList runat="server" ID="clientDropDown" DataTextField="name" DataValueField="id" />
        </td>
         <td>
            Employee: <br />
            <asp:DropDownList runat="server" ID="employeeDropDown" DataTextField="name" DataValueField="id" />
        </td>
        <td>
            <asp:Button ID="btnAdd" runat="server" Text="Add" OnClick="Insert" />
        </td>
    </tr>
    </table>
    <br />
    <br />
    <hr />
    <h2>List of Engagements</h2>
    
        <asp:GridView ID="GridViewEngagements" runat="server" AutoGenerateColumns="False" DataKeyNames="id" EmptyDataText="No records has been added."
            OnRowDeleting="OnRowDeleting" OnRowEditing="OnRowEditing" OnRowCancelingEdit="OnRowCancelingEdit"  OnRowUpdating="OnRowUpdating" EnableViewState="False" OnRowCommand="OnRowEnd">
            <Columns>
                <asp:BoundField DataField="id" HeaderText="Id" ReadOnly="true"/>
                
                <asp:TemplateField HeaderText="Name">
                    <ItemTemplate>
                        <asp:Label ID="lblName" runat="server" Text='<%# Eval("name") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="txtName" runat="server" Text='<%# Eval("name") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField HeaderText="Description">
                    <ItemTemplate>
                        <asp:Label ID="lblDescription" runat="server" Text='<%# Eval("description") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="txtDescription" runat="server" Text='<%# Eval("description") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="client.name" HeaderText="Client Name" ReadOnly="true" />
                <asp:BoundField DataField="employee.name" HeaderText="Employee Name" ReadOnly="true" />
                <asp:BoundField DataField="started" HeaderText="Date Started" ReadOnly="true" />
                <asp:BoundField DataField="ended" HeaderText="Date End" ReadOnly="true" />
                <asp:ButtonField Text="End Engagements" CommandName="OnRowEnd"/>
                <asp:CommandField ShowEditButton="true" />
                <asp:CommandField ShowDeleteButton="true" />
                
                
                
                
                
                
                
            </Columns>
        </asp:GridView>
</asp:Content>
