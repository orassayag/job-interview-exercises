API - DEVICES

GET getDevices
Request:
{
    token
    count / page
}

Response:
{
    data:
        devicesList:
        [
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            },
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            },
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            }

        ]
        count: 3,
        totalCount: 300,
}

API - RESERVATIONS

GET getReservations
Request:
{
    token
    date
}

Response:
{
    data:
        reservationsList: [
            {
                deviceId: 349765873465783,
                title
                reserveUserId: 7
                useDate: dateTime (With specific hour) / timestamps
            },
            {
                deviceId: 349765873465783,
                reserveUserId: 18
                startUseDate: dateTime (With specific hour) / timestamps
                endUseDate: dateTime (With specific hour) / timestamps
            },
            {
                deviceId: 349765873465783,
                reserveUserId: 18
                [

                ]
            },
            {
                deviceId: 349765873465783,
                reserveUserId: 90
                useDate: dateTime (With specific hour) / timestamps
            }
        ]
    count: 3,
    totalCount: 300,
}

POST addReservation
{
    Request:
    {
        token
        userId
        devicesList: [
            349765873465783, 349765873465783,349765873465783
        ] // devices Ids.
        startUseDate: dateTime (With specific hour) / timestamps,
        endUseDate: dateTime (With specific hour) / timestamps
    },

    Response: {
        devicesList: [
            {
                deviceId: 349765873465783,
                status: SUCCESS
            },
            {
                deviceId: 349765873465783,
                status: IN USE
            }
        ]
    }
}

GET searchDevice
{
    Request:
    {
        token
        keyword
    }

    Response:
    {
        data:
        devicesList:
        [
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            },
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            },
            {
                deviceId: 384765834587,
                title: Apple Iphone-7
                Availabillity: true/false
            }

        ]
        count: 3,
        totalCount: 300,
    }
}

