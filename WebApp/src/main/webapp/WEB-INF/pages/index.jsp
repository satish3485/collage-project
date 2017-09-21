<html>
<body>
<h1>Maven + Spring MVC Web Project Example</h1>
 
<h3>Message : ${message}</h3>
<h3>Counter : ${counter}</h3>

<form action="#" th:action="@{/}" th:object="${message}" method="post">
    	<p>Id: <input type="text" th:field="*{counter}" /></p>
        <p>Message: <input type="text" th:field="*{counter}" /></p>
        <p><input type="submit" value="Submit" /> <input type="reset" value="Reset" /></p>
    </form>	
</body>
</html>