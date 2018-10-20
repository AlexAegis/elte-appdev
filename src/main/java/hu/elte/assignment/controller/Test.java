package hu.elte.assignment.controller;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
class Test {
		public String username;
		public String password;

		public Test() {
		}



	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
		public String toString() {
			return username + password;
		}
	}