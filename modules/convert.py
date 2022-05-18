class Convert:
    def secToMin(sec: str):
        i_sec = int(sec)
        return str(i_sec // 60).zfill(2) + ":" + str(i_sec % 60).zfill(2)
