<%@ Page Title="Engagments" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Engagements.aspx.cs" Inherits="foundry_assessment.Engagement" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Engagements Page</h1>

    <!--<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
    <tr>
        <td>Create Name:<br />
            <asp:TextBox ID="txtName" runat="server"/>
        </td>
        <td>
            <asp:Button ID="btnAdd" runat="server" Text="Add" OnClick="Insert" />
        </td>
    </tr>
    </table>
    <br />
    <br />
    <hr /> -->
    <h2>List of Engagements</h2>
    
        <asp:GridView ID="GridViewEngagements" runat="server" AllowPaging="false" AutoGenerateColumns="false" DataKeyNames="id" EmptyDataText="No records has been added."
            OnRowDeleting="OnRowDeleting" OnRowEditing="OnRowEditing" OnRowCancelingEdit="OnRowCancelingEdit"  OnRowUpdating="OnRowUpdating" EnableViewState="false">
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
                <asp:CommandField ShowEditButton="true" />
                <asp:CommandField ShowDeleteButton="true" />
            </Columns>
        </asp:GridView>
</asp:Content>
