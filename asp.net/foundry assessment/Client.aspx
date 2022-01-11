<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Client.aspx.cs" Inherits="foundry_assessment.Client" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <h1>Client Page</h1>
    <h2>List of client Data</h2>
    <form runat="server">
        <asp:GridView ID="GridViewClients" runat="server" AllowPaging="false" AutoGenerateColumns="false" DataKeyNames="id" EmptyDataText="No records has been added." OnRowDeleting="OnRowDeleting" >
            <Columns>
                <asp:BoundField DataField="id" HeaderText="Id" />
                <asp:BoundField DataField="name" HeaderText="Name" />
                <asp:CommandField ShowEditButton="true" />
                <asp:CommandField ShowDeleteButton="true" />
            </Columns>
        </asp:GridView>
    </form>
</body>
</html>
