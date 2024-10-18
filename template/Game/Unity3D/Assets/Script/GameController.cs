using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour
{
    private float maxSpeed = 5.0f;
    private float acceleration = 2.0f;
    private float deceleration = 2.0f;
    private Vector3 velocity = Vector3.zero;

    void Update()
    {
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        Vector3 direction = new Vector3(moveHorizontal, 0.0f, moveVertical).normalized;

        if (direction.magnitude > 0)
        {
            velocity += direction * acceleration * Time.deltaTime;
            velocity = Vector3.ClampMagnitude(velocity, maxSpeed);
        }
        else
        {
            velocity = Vector3.MoveTowards(velocity, Vector3.zero, deceleration * Time.deltaTime);
        }

        transform.Translate(velocity * Time.deltaTime, Space.World);
    }

    void LateUpdate()
        {
            if (transform.position.y < -5)
            {
                transform.position = new Vector3(0, 2, -2);
                velocity = Vector3.zero;
            }
        }
}
