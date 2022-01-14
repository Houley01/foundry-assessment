<%@ Page Title="BB.AI Foundry Assessment" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="foundry_assessment._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
        <h1>Blackbook.Ai - Foundry Assessment</h1>
        <h2>Task</h2>
        <p>Create a resource engagement app using framework that has beeen discussed that allows managers to assign Employees to Clients on Engagements. 
            Engagements are periods of time when an employee is working for a client.</p>
        <a href="https://github.com/trappett/foundry-assessment" class="btn btn-primary btn-lg">Original Github Repo &raquo;</a>
        <a href="https://github.com/Houley01/foundry-assessment" class="btn btn-primary btn-lg">Forked Github Repo &raquo;</a>
    </div>
    <div class="row">
        <h3>Getting Started</h3>
        <ul>
            <li>Clone or fork the repo: <href>http://github.com/trappett/foundry-assessment<href/> </li> 
            <li>The repo contains an existing backend for your app to connect to. </li>
            <li>If you are using Vue, there is an existing skeleton frontend you can use. If you are using React, you will need to create this yourself.</li>
            <li>There are readme.md files in the frontend and backend dirs with details on how to get started. </li>
            <li>Note: backend/data.db contains the database. If at any point you want to wipe your data and start over, delete that file and restart the server. </li>
            <li>Creating components from scratch rather than utilizing an existing component library would be preferred, as it is a better showcase of your ability. In particular, please don't utilize a pre-made datatable component, rather use a table component and implement the necessary logic yourself. </li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2> Task Employee</h2>
            <ul>
                <li>View a list of employees </li>
                <li>Ability to add/view/edit/delete employees</li>
                <li>Ability to filter the list of employees by any relevant field (e.g. name)</li>
            </ul>
            <a class="btn btn-default" href="./Employee">View Employee &raquo;</a>
        </div>

        <div class="col-md-4">
            <h2>Task Client</h2>
            <ul>
                <li>View a list of client </li>
                <li>Ability to add/view/edit/delete client</li>
                <li>Ability to filter the list of client by any relevant field (e.g. name)</li>
            </ul>
             <a class="btn btn-default" href="./Client">View Clients &raquo;</a>
        </div>
        <div class="col-md-4">
            <h2>Task Engagements</h2>
            <ul>
                <li>View a list of engagements </li>
                <li>Ability to filter the list by any relevant field.</li>
                <li>Style engagements according to whether it’s a future/current/ended engagement</li>
                <li>Ability to add/view/edit/delete engagements</li>
                <li>Ability to list engagements by employee</li>
                <li>Ability to list engagements by client</li>
            </ul>
            <a class="btn btn-default" href="./Engagements">View Engagements &raquo;</a>
        </div>
    </div>

</asp:Content>
