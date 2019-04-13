workflow "Install, Test" {
  on = "release"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "t"
}
