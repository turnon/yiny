package main

import (
	"os/exec"
	"strings"
)

func main() {
	cmd := exec.Command("node", "script.js")
	cmd.Env = []string{"username=mail@qq.com", "password=psw"}

	stdout, err := cmd.Output()
	if err != nil {
		println(err.Error())
		return
	}

	str := string(stdout)
	resp := strings.Split(str, "\n")
	finalStatus := resp[len(resp)-2]

	if finalStatus != "ok" {
		println(resp[len(resp)-2])
		return
	}

	token := resp[len(resp)-4]
	println(token)
}
