<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Client.aspx.cs" Inherits="foundry_assessment.Client"  Async="true"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <h1>Client Page</h1>
    <form runat="server">
    <table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
    <tr>
        <td>Client Name:<br />
            <asp:TextBox ID="txtName" runat="server"/>
        </td
        <td>
            <asp:Button ID="btnAdd" runat="server" Text="Add" OnClick="Insert" />
        </td>
    </tr>
    </table>
    <br />
    <hr />
    <h2>List of client Data</h2>
    
        <asp:GridView ID="GridViewClients" runat="server" AllowPaging="false" AutoGenerateColumns="false" DataKeyNames="id" EmptyDataText="No records has been added." OnRowDeleting="OnRowDeleting" >
            <Columns>
                <asp:BoundField DataField="id" HeaderText="Id" />
                <asp:BoundField DataField="name" HeaderText="Name" />
                <asp:CommandField ShowEditButton="true" />
                <asp:CommandField ShowDeleteButton="true" />
            </Columns>
        </asp:GridView>
    </form>
    <br />
    <hr />
</body>

</html>
